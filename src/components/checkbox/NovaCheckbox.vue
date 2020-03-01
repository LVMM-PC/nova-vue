<template>
  <div
    ref="checkbox"
    class="nova-ui-checkbox"
    v-bind="$attrs"
    v-on="$listeners"
    @click="handleCheckboxClick"
    :class="classList"
    :tabindex="!isDisabled ? 0 : -1"
  >
    <div class="nova-ui-checkbox-input">
      <div class="nova-ui-checkbox-inner"></div>
    </div>
    <div class="nova-ui-checkbox-label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NovaCheckbox',
  inject: {
    NovaCheckboxGroup: {
      default: null
    }
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    value: {},
    label: {
      type: [Number, Boolean, String],
      default: ''
    }
  },
  computed: {
    classList() {
      return {
        'is-checked': this.isChecked,
        'is-disabled': this.isDisabled
      };
    },
    isDisabled() {
      return this.disabled || this.groupDisabled;
    },
    groupValue() {
      return this.NovaCheckboxGroup?.value;
    },
    groupDisabled() {
      return this.NovaCheckboxGroup?.disabled;
    },
    isChecked() {
      if (this.NovaCheckboxGroup) {
        return this.groupValue.find(item => {
          return item === this.value;
        });
      } else {
        return this.checked;
      }
    }
  },
  methods: {
    onlySingleClick() {
      this.$emit('change', !this.checked);
    },
    inGroupClick() {
      this.NovaCheckboxGroup.setCheck(this.value, !this.isChecked);
    },
    handleCheckboxClick() {
      if (this.isDisabled) {
        return;
      }

      if (this.NovaCheckboxGroup) {
        this.inGroupClick();
      } else {
        this.onlySingleClick();
      }
    }
  }
};
</script>

<style lang="less">
@import '../../styles/var';

.nova-ui-checkbox {
  cursor: pointer;
  line-height: 20px;
  color: #333333;
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  font-family: @font-family;

  &:focus {
    outline: none;

    .nova-ui-checkbox-input {
      border: 1px solid #ee3388;
    }
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(.is-disabled) {
    .nova-ui-checkbox-input {
      border: 1px solid #ee3388;
    }
  }

  &.is-checked {
    .nova-ui-checkbox-input {
      border: 1px solid #ee3388;
    }

    .nova-ui-checkbox-inner {
      display: block;
    }
  }
}

.nova-ui-checkbox-input {
  display: inline-block;
  vertical-align: top;
  width: 14px;
  height: 14px;
  margin-top: 3px;
  margin-right: 4px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  position: relative;
}

.nova-ui-checkbox-inner {
  display: none;
  width: 4.94974747px;
  height: 8.4852814px;
  transform: translate(-50%, -50%);
  transform-origin: center center;
  position: absolute;
  top: 50%;
  left: 50%;

  &:before {
    margin-top: -0.70710678px; //( sqrt(2^2 / 2) ) / 2
    box-sizing: border-box;
    width: 4.94974747px; //sqrt(7^2 / 2)
    height: 8.4852814px; //sqrt(12^2 / 2)
    content: '';
    display: block;
    border: 2px solid #ee3388;
    border-top: none;
    border-left: none;
    transform: rotate(45deg);
  }
}

.nova-ui-checkbox-label {
  display: inline-block;
  vertical-align: top;
}
</style>
