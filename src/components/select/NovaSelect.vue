<template>
  <div
    ref="select"
    class="nova-select"
    :class="selectClass"
    v-bind="$attrs"
    :tabindex="!disabled ? 0 : -1"
    v-on="$listeners"
  >
    <div class="nova-select-toggle" @click="handleToggleClick">
      <span class="nova-select-arrow"></span>
      <ClientOnly>
        <template v-if="multiple === false">
          <span
            v-if="!hasValue()"
            class="nova-select-text nova-select-placeholder"
          >
            {{ getPlaceholder() }}
          </span>
          <span v-if="hasValue()" class="nova-select-text">
            {{ displayedLabel() || value }}
          </span>
        </template>
        <template v-if="multiple === true && value">
          <span
            v-if="!value.length"
            class="nova-select-text nova-select-placeholder"
          >
            {{ getPlaceholder() }}
          </span>
          <div class="nova-select-labels">
            <transition-group
              name="nova-zoom"
              @after-leave="handleTransitionFinished"
              @enter="handleTransitionFinished"
            >
              <span v-for="v in value" :key="v" class="nova-select-label">
                <span>{{ valueToLabel(v) || v }}</span>
                <span
                  class="nova-select-label-delete"
                  :class="{ 'is-disabled': disabled }"
                  @click="handleDeleteClick(v)"
                ></span>
              </span>
            </transition-group>
          </div>
        </template>
      </ClientOnly>
    </div>

    <NovaDropdown
      ref="dropdown"
      :opened="opened"
      :append-to-body="appendToBody && dropdownLoaded"
      :popover-class="['nova-select-dropdown', popoverClass]"
    >
      <slot></slot>
    </NovaDropdown>
  </div>
</template>

<script>
import Utils from '@/utils/utils';
import locale from '@/mixin/locale';
import NovaDropdown from '@/components/dropdown/NovaDropdown.jsx';

export default {
  name: 'NovaSelect',
  components: { NovaDropdown },
  mixins: [locale],
  provide() {
    return {
      NovaSelect: this
    };
  },
  model: {
    event: 'update'
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Boolean, Array],
      default: null
    },
    popoverClass: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dropdownLoaded: false,
      opened: false,
      currentChild: null,
      multipleOptions: []
    };
  },
  computed: {
    selectClass() {
      return {
        'is-open': this.opened,
        'is-disabled': this.disabled
      };
    },
    valueHash() {
      let hash = {};
      this.multipleOptions.forEach(option => {
        hash[option.value] = option;
      });
      return hash;
    }
  },
  destroyed() {
    this.closeDropdown();
  },
  methods: {
    hasValue() {
      let value = this.value;

      switch (typeof value) {
        case 'boolean':
          return true;
        case 'number':
          return true;
        case 'undefined':
          return false;
        case 'object':
          return null !== value;
        default:
          return !!value;
      }
    },
    displayedLabel() {
      let value = this.value;
      if (this.hasValue(value)) {
        return this.valueToLabel(value);
      }
      return value;
    },
    getPlaceholder() {
      if (this.placeholder) {
        return this.placeholder;
      }
      if (this.novaLocale.select.placeholder) {
        return this.novaLocale.select.placeholder;
      }
    },
    valueToLabel(value) {
      let found = this.valueHash[value];
      if (found !== null && found !== undefined) {
        return found.label;
      }
      return '';
    },
    setSelected(value) {
      if (this.multiple) {
        let newValue = this.value.slice();
        let foundIndex = newValue.findIndex(v => {
          return v === value;
        });
        if (foundIndex !== -1) {
          newValue.splice(foundIndex, 1);
        } else {
          newValue.push(value);
        }

        this.$emit('update', newValue);
        this.$emit('change', newValue);
      } else {
        if (this.value !== value) {
          this.$emit('update', value);
          this.$emit('change', value);
        }
      }
    },
    getValue() {
      return this.value;
    },
    close() {
      this.opened = false;
      this.closeDropdown();
    },
    handleToggleClick(e) {
      if (!this.dropdownLoaded) {
        this.dropdownLoaded = true;
        this.$nextTick(() => {
          this.handleToggleClick(e);
        });
        return;
      }

      if (this.disabled) {
        return;
      }

      let target = e.target;
      let isDelete = Utils.hasClassName(target, 'nova-select-label-delete');
      if (isDelete) {
        return;
      }

      this.opened = !this.opened;
      if (this.opened) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    },
    openDropdown() {
      document.addEventListener('click', this.handleOtherClick);
      this.$emit('open');
      this.refreshDropdown();
    },
    refreshDropdown() {
      if (this.appendToBody) {
        let select = this.$refs['select'];
        let dropdown = this.$refs['dropdown'];
        dropdown.setPosition(select);
      }
    },
    handleTransitionFinished() {
      this.refreshDropdown();
    },
    closeDropdown() {
      document.removeEventListener('click', this.handleOtherClick);
      this.$emit('close');
    },
    handleOtherClick(e) {
      let $select = this.$refs['select'];
      let stopToggle = Utils.isParentsOrSelf(e.target, $select);
      let stopDropdown = Utils.isParentsOrSelf(e.target, this.getDropdownDom());

      if (!(stopToggle || stopDropdown)) {
        this.opened = false;

        this.closeDropdown();
      }
    },
    addMultipleOption(option) {
      this.multipleOptions.push(option);
    },
    handleDeleteClick(value) {
      if (this.disabled) {
        return;
      }

      this.setSelected(value);
    },
    getDropdownDom() {
      return this.$refs['dropdown'].getDom();
    }
  }
};
</script>
