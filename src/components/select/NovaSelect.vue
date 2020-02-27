<template>
  <div
    ref="select"
    class="nova-ui-select"
    :class="selectClass"
    v-bind="$attrs"
    v-on="$listeners"
    :tabindex="!disabled ? 0 : -1"
  >
    <div class="nova-ui-select-toggle" @click="handleToggleClick">
      <span class="nova-ui-select-arrow"></span>
      <template v-if="multiple === false">
        <span
          class="nova-ui-select-text nova-ui-select-placeholder"
          v-if="!hasValue()"
        >
          {{ getPlaceholder() }}
        </span>
        <span class="nova-ui-select-text" v-if="hasValue()">
          {{ displayedLabel() || value }}
        </span>
      </template>
      <template v-if="multiple === true">
        <span
          class="nova-ui-select-text nova-ui-select-placeholder"
          v-if="!value.length"
        >
          {{ getPlaceholder() }}
        </span>
        <div class="nova-ui-select-labels" v-if="value.length">
          <span class="nova-ui-select-label" v-for="v in value" :key="v">
            <span>{{ valueToLabel(v) || v }}</span>
            <span
              class="nova-ui-select-label-delete"
              :class="{ 'is-disabled': disabled }"
              @click="handleDeleteClick(v)"
            ></span>
          </span>
        </div>
      </template>
    </div>

    <div>
      <NovaDropdown
        ref="dropdown"
        :opened="opened"
        :append-to-body="appendToBody"
        :popover-class="['nova-ui-select-dropdown', popoverClass]"
      >
        <slot></slot>
      </NovaDropdown>
    </div>
  </div>
</template>

<script>
import NovaDropdown from '../dropdown/NovaDropdown';
import locale from '@/mixin/locale';
import Utils from '@/utils/utils';

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
      default: undefined
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
      if (found) {
        return found.label;
      }
      return '';
    },
    setValue(value) {
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
        this.$emit('update', value);
        this.$emit('change', value);
      }
    },
    getValue() {
      return this.value;
    },
    close() {
      this.opened = false;
      this.closeDropdown();
    },
    handleToggleClick() {
      if (this.disabled) {
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
      if (this.appendToBody) {
        let select = this.$refs['select'];
        let dropdown = this.$refs['dropdown'];
        dropdown.setPosition(select);
      }
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

      this.setValue(value);
    },
    getDropdownDom() {
      return this.$refs['dropdown'].getDom();
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/var';

.nova-ui-select {
  width: 200px;
  vertical-align: top;
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  font-family: @font-family;

  &:focus {
    outline: none;

    .nova-ui-select-toggle {
      border: 1px solid #aaaaaa;
    }

    .nova-ui-select-arrow {
      border-left: 1px solid #cccccc;
    }
  }

  &.is-disabled {
    opacity: 0.5;
    background-color: #eee;

    .nova-ui-select-toggle {
      cursor: default;
    }
  }

  &.is-open {
    .nova-ui-select-toggle {
      background-color: #fff;
      position: relative;
      z-index: 1;
    }

    .nova-ui-select-arrow {
      &:before {
        transform: rotate(180deg);
      }
    }
  }
}

.nova-ui-select-toggle {
  cursor: pointer;
  display: block;
  border: 1px solid #cccccc;
}

.nova-ui-select-text {
  display: inline-block;
  vertical-align: top;
  padding: 4px 10px;
}

.nova-ui-select-placeholder {
  opacity: 0.5;
}

.nova-ui-select-labels {
  padding: 2px;
}

.nova-ui-select-label {
  display: inline-block;
  vertical-align: top;
  margin: 2px;
  line-height: 18px;
  padding: 0 4px;
  border: 1px solid #ccc;
}

.nova-ui-select-label-delete {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #ccc;
  display: inline-block;
  vertical-align: top;
  margin: 3px 0 0 3px;
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

.nova-ui-select-arrow {
  float: right;
  vertical-align: top;
  width: 24px;
  height: 20px;
  margin-top: 4px;
  border-left: 1px solid #eeeeee;
  display: inline-block;
  text-align: center;

  &:before {
    vertical-align: top;
    margin-top: 8px;
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
  .nova-ui-select-arrow {
    &:before {
      transition: transform 200ms;
    }
  }

  .nova-ui-select {
    &.is-open {
      .nova-ui-select-arrow {
        &:before {
          transform: rotate3d(1, 0, 0, 180deg);
        }
      }
    }
  }
}
</style>
