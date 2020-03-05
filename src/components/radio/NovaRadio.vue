<template>
  <div
    ref="radio"
    class="nova-radio"
    v-bind="$attrs"
    v-on="$listeners"
    @click="handleRadioClick"
    :class="classList"
    :tabindex="!isDisabled ? 0 : -1"
  >
    <div class="nova-radio-input">
      <div class="nova-radio-inner"></div>
    </div>
    <div class="nova-radio-label">
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
    event: 'update'
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
    inGroupClick() {
      this.NovaRadioGroup.setChecked(this.value, true);
    },
    handleRadioClick() {
      if (this.isDisabled) {
        return;
      }

      if (this.isChecked) {
        return;
      }

      this.$emit('change', true);

      if (this.NovaRadioGroup) {
        this.inGroupClick();
      } else {
        this.$emit('update', true);
      }
    }
  },
  watch: {
    isChecked(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      this.$emit('update', newValue);
    },
    checked(newValue, oldValue) {
      if (newValue === oldValue) {
        return;
      }

      if (!this.NovaRadioGroup) {
        return;
      }

      if (newValue) {
        this.NovaRadioGroup.setChecked(this.value, false);
      } else {
        let isChecked = this.value === this.NovaRadioGroup.getChecked();
        if (isChecked) {
          this.NovaRadioGroup.setChecked(null, false);
        }
      }
    }
  }
};
</script>

<style lang="less">
@import '../../styles/var';

@radio: @{prefixed}-radio;

.@{radio} {
  cursor: pointer;
  line-height: 20px;
  color: #333333;
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  font-family: @font-family;

  &:focus {
    outline: none;

    &:not(.is-disabled) {
      .@{radio}-input {
        border: 1px solid #ee3388;
      }
    }
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(.is-disabled) {
    .@{radio}-input {
      border: 1px solid #ee3388;
    }
  }

  &.is-checked {
    .@{radio}-input {
      border: 1px solid #ee3388;
    }

    .@{radio}-inner {
      opacity: 1;
      transform: scale(1);
    }
  }
}

.@{radio}-input {
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

.@{radio}-inner {
  opacity: 0;
  width: 8px;
  height: 8px;
  transform: scale(0);
  transition: transform @fast-motion @ease-in-out-circular;
  background-color: #ee3388;
  border-radius: 50%;
  margin: 2px;
}

.@{radio}-label {
  display: inline-block;
  vertical-align: top;
}
</style>
