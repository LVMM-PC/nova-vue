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
    value: {
      type: [Number, Boolean, String],
      default: null
    },
    label: {
      type: [Number, Boolean, String],
      default: ''
    }
  },
  computed: {
    classList() {
      const { isChecked, isDisabled } = this;

      return [
        'nova-checkbox',
        {
          'is-checked': isChecked,
          'is-disabled': isDisabled
        }
      ];
    },
    isDisabled() {
      const { disabled, groupDisabled } = this;

      return disabled || groupDisabled;
    },
    groupValue() {
      return this.NovaCheckboxGroup?.value;
    },
    groupDisabled() {
      return this.NovaCheckboxGroup?.disabled;
    },
    isChecked() {
      const { groupValue, checked } = this;

      if (this.NovaCheckboxGroup) {
        return groupValue.some(item => {
          return item === this.value;
        });
      } else {
        return checked;
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
  render() {
    const {
      handleCheckboxClick,
      $attrs,
      $listeners,
      $slots,
      classList,
      isDisabled,
      label
    } = this;

    const tabIndex = isDisabled ? -1 : 0;

    const children = $slots.default;

    const checkboxProps = {
      class: classList,
      attrs: {
        ...$attrs,
        tabindex: tabIndex
      },
      on: {
        ...$listeners,
        click: handleCheckboxClick
      },
      ref: 'checkbox'
    };

    return (
      <div {...checkboxProps}>
        <div class="nova-checkbox-input">
          <div class="nova-checkbox-inner"></div>
        </div>
        <div class="nova-checkbox-label">{children || label}</div>
      </div>
    );
  }
};
