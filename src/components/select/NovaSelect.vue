<template>
  <div
    ref="select"
    class="nova-select"
    :class="selectClass"
    v-bind="$attrs"
    v-on="$listeners"
    :tabindex="!disabled ? 0 : -1"
  >
    <div class="nova-select-toggle" @click="handleToggleClick">
      <span class="nova-select-arrow"></span>
      <template v-if="multiple === false">
        <span
          class="nova-select-text nova-select-placeholder"
          v-if="!hasValue()"
        >
          {{ getPlaceholder() }}
        </span>
        <span class="nova-select-text" v-if="hasValue()">
          {{ displayedLabel() || value }}
        </span>
      </template>
      <template v-if="multiple === true && value">
        <span
          class="nova-select-text nova-select-placeholder"
          v-if="!value.length"
        >
          {{ getPlaceholder() }}
        </span>
        <div class="nova-select-labels">
          <transition-group
            name="nova-zoom"
            @after-leave="handleTransitionFinished"
            @enter="handleTransitionFinished"
          >
            <span class="nova-select-label" v-for="v in value" :key="v">
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
    </div>

    <NovaDropdown
      ref="dropdown"
      :opened="opened"
      :append-to-body="appendToBody"
      :popover-class="['nova-select-dropdown', popoverClass]"
    >
      <slot></slot>
    </NovaDropdown>
  </div>
</template>

<script>
import Utils from '@/utils/utils';
import locale from '@/mixin/locale';
import NovaDropdown from '@/components/dropdown/NovaDropdown';

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
      type: String
    },
    value: {},
    popoverClass: {
      type: String,
      default: null
    }
  },
  data() {
    return {
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

<style lang="less">
@import '../../styles/var';

@select: @{prefixed}-select;

.@{select} {
  width: 200px;
  vertical-align: top;
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  font-family: @font-family;

  &:focus {
    outline: none;

    &:not(.is-disabled) {
      .@{select}-toggle {
        border: 1px solid #aaaaaa;
      }

      .@{select}-arrow {
        border-left: 1px solid #cccccc;
      }
    }
  }

  &.is-disabled {
    opacity: 0.5;
    background-color: #eee;

    .@{select}-toggle {
      cursor: default;
    }

    .@{select}-label {
      background-color: #eee;
    }
  }

  &.is-open {
    .@{select}-toggle {
      background-color: #fff;
      z-index: 1;
    }

    .@{select}-arrow {
      &:before {
        transform: rotate(180deg);
      }
    }
  }
}

.@{select}-toggle {
  position: relative;
  cursor: pointer;
  display: block;
  border: 1px solid #cccccc;
  min-height: 28px;
  padding-right: 23px;
}

.@{select}-text {
  display: block;
  vertical-align: top;
  padding: 4px 10px;
  .ellipsis();
}

.@{select}-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 23px;
  opacity: 0.5;
  .ellipsis();
}

.@{select}-labels {
  padding: 2px;
}

.@{select}-label {
  max-width: calc(100% - 4px);
  box-sizing: border-box;
  background-color: #fff;
  position: relative;
  display: inline-block;
  vertical-align: top;
  margin: 2px;
  line-height: 18px;
  padding: 0 18px 0 4px;
  border: 1px solid #ccc;
  .ellipsis();
}

.@{select}-label-delete {
  position: absolute;
  right: 0;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  display: inline-block;
  vertical-align: top;
  margin: 3px;
  text-align: center;
  line-height: 12px;

  &:hover:not(.is-disabled) {
    background-color: #666;
  }

  &:after,
  &:before {
    background-color: #fff;
    display: block;
    content: '';
    position: absolute;
    transform: translate(2.5px, 2.5px) rotate(45deg);
  }

  &:after {
    width: 7px;
    height: 1px;
    margin: 3px 0 0 0;
  }

  &:before {
    width: 1px;
    height: 7px;
    margin: 0 0 0 3px;
  }
}

.@{select}-arrow {
  position: absolute;
  display: block;
  top: 4px;
  box-sizing: border-box;
  bottom: 4px;
  right: 0;
  width: 23px;
  border-left: 1px solid #eeeeee;
  text-align: center;

  &:before {
    position: absolute;
    left: 50%;
    top: 50%;
    vertical-align: top;
    margin: -2px -4px;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 4px 4px 0 4px;
    border-color: #333 transparent transparent transparent;
    display: inline-block;
  }
}

@supports (transform-style: preserve-3d) {
  .@{select}-arrow {
    &:before {
      transition: transform @normal-motion;
    }
  }

  .@{select} {
    &.is-open {
      .@{select}-arrow {
        &:before {
          transform: rotate3d(1, 0, 0, 180deg);
        }
      }
    }
  }
}
</style>
