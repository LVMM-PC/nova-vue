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
