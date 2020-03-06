<template>
  <div
    ref="checkbox"
    class="nova-checkbox"
    v-bind="$attrs"
    v-on="$listeners"
    @click="handleCheckboxClick"
    :class="classList"
    :tabindex="!isDisabled ? 0 : -1"
  >
    <div class="nova-checkbox-input">
      <div class="nova-checkbox-inner"></div>
    </div>
    <div class="nova-checkbox-label">
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
      return this.NovaCheckboxGroup?.value;
    },
    groupDisabled() {
      return this.NovaCheckboxGroup?.disabled;
    },
    isChecked() {
      if (this.NovaCheckboxGroup) {
        return this.groupValue.some(item => {
          return item === this.value;
        });
      } else {
        return this.checked;
      }
    }
  },
  methods: {
    inGroupClick() {
      this.NovaCheckboxGroup.setChecked(this.value, !this.isChecked, true);
    },
    handleCheckboxClick() {
      if (this.isDisabled) {
        return;
      }

      this.$emit('change', !this.isChecked);

      if (this.NovaCheckboxGroup) {
        this.inGroupClick();
      } else {
        this.$emit('update', !this.isChecked);
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

      if (!this.NovaCheckboxGroup) {
        return;
      }

      this.NovaCheckboxGroup.setChecked(this.value, newValue, false);
    }
  }
};
</script>

<style lang="less">
@import '../../styles/var';

@checkbox: @{prefixed}-checkbox;

@checkWidth: 4.94974747px; // sqrt(7^2 / 2)
@checkHeight: 8.4852814px; // sqrt(12^2 / 2)
@checkTop: 1.41421356px; // sqrt(2^2 / 2)

.@{checkbox} {
  cursor: pointer;
  line-height: 20px;
  display: inline-block;
  vertical-align: top;
  font-size: 12px;
  font-family: @font-family;
  color: @font-color;

  &:focus {
    outline: none;

    &:not(.is-disabled) {
      .@{checkbox}-input {
        border: 1px solid #ee3388;
      }
    }
  }

  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(.is-disabled) {
    .@{checkbox}-input {
      border: 1px solid #ee3388;
    }
  }

  &.is-checked {
    .@{checkbox}-input {
      border: 1px solid #ee3388;
    }

    .@{checkbox}-inner {
      &:before {
        transform: rotate(45deg) scale(1);
        opacity: 1;
      }
    }
  }
}

.@{checkbox}-input {
  display: inline-block;
  vertical-align: top;
  width: 14px;
  height: 14px;
  margin-top: 8px;
  border: 1px solid #cccccc;
  box-sizing: border-box;
  position: relative;
}

.@{checkbox}-inner {
  &:before {
    opacity: 0;
    margin-top: (12 - @checkHeight) / 2 - @checkTop / 2;
    margin-left: (12 - @checkWidth) / 2;
    box-sizing: border-box;
    width: @checkWidth;
    height: @checkHeight;
    content: '';
    display: block;
    border: 2px solid #ee3388;
    border-top: none;
    border-left: none;
    transform: rotate(45deg) scale(0);
    transition: transform @normal-motion @ease-out-backward;
  }
}

.@{checkbox}-label {
  display: inline-block;
  vertical-align: top;
  padding: 5px;
}
</style>
