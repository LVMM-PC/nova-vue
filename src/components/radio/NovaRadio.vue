<template>
  <div
    ref="radio"
    class="nova-ui-radio"
    v-bind="$attrs"
    v-on="$listeners"
    @click="handleRadioClick"
    :class="classList"
    :tabindex="!isDisabled ? 0 : -1"
  >
    <div class="nova-ui-radio-input">
      <div class="nova-ui-radio-inner"></div>
    </div>
    <div class="nova-ui-radio-label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NovaRadio',
  inject: {
    NovaRadioGroup: {
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
      return this.NovaRadioGroup?.value;
    },
    groupDisabled() {
      return this.NovaRadioGroup?.disabled;
    },
    isChecked() {
      if (this.NovaRadioGroup) {
        return this.value === this.groupValue;
      } else {
        return this.checked;
      }
    }
  },
  methods: {
    onlySingleClick: function() {
      this.$emit('change', true);
    },
    inGroupClick() {
      this.NovaRadioGroup.setValue(this.value);
    },
    handleRadioClick() {
      if (this.isDisabled) {
        return;
      }

      if (this.NovaRadioGroup) {
        this.inGroupClick();
      } else {
        this.onlySingleClick();
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/var';

.nova-ui-radio {
  cursor: pointer;
  line-height: 20px;
  color: #333333;
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  font-family: @font-family;

  &:focus {
    outline: none;
    .nova-ui-radio-input {
      border: 1px solid #ee3388;
    }
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(.is-disabled) {
    .nova-ui-radio-input {
      border: 1px solid #ee3388;
    }
  }

  &.is-checked {
    .nova-ui-radio-input {
      border: 1px solid #ee3388;
    }

    .nova-ui-radio-inner {
      display: block;
    }
  }
}

.nova-ui-radio-input {
  display: inline-block;
  vertical-align: top;
  width: 14px;
  height: 14px;
  margin-top: 3px;
  margin-right: 4px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  border-radius: 50%;
}

.nova-ui-radio-inner {
  display: none;
  width: 8px;
  height: 8px;
  background-color: #ee3388;
  border-radius: 50%;
  margin: 2px;
}

.nova-ui-radio-label {
  display: inline-block;
  vertical-align: top;
}
</style>
