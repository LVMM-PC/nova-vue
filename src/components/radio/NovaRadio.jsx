import Storage from '@/utils/storage';

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
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-radio`
    },
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
      const { isChecked, isDisabled, prefixedClass } = this;

      return [
        prefixedClass,
        {
          'is-checked': isChecked,
          'is-disabled': isDisabled
        }
      ];
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
        const isChecked = this.value === this.NovaRadioGroup.getChecked();
        if (isChecked) {
          this.NovaRadioGroup.setChecked(null, false);
        }
      }
    }
  },
  methods: {
    inGroupClick() {
      this.NovaRadioGroup.setChecked(this.value, true);
    },
    handleRadioClick(e, ...restArgs) {
      if (this.isDisabled) {
        return;
      }

      this.$emit('click', e, ...restArgs);

      const target = e.target;

      const targetIsInput = target instanceof HTMLInputElement;
      const targetIsTextArea = target instanceof HTMLTextAreaElement;

      if (!(targetIsInput || targetIsTextArea)) {
        this.$refs['input']?.focus();
        this.setChecked();
      }
    },
    setChecked() {
      if (this.isChecked) {
        return;
      }

      this.$emit('change', true);

      if (this.NovaRadioGroup) {
        this.inGroupClick();
      } else {
        this.$emit('update', true);
      }
    },
    handleKeydown(e) {
      if (this.isDisabled) {
        return;
      }

      switch (e.key) {
        case 'Spacebar': // IE/Edge
        case ' ':
          e.preventDefault();
          this.setChecked();
          break;
        case 'Enter':
          e.preventDefault();
          this.setChecked();
          break;
      }
    }
  },
  render() {
    const {
      $attrs,
      $listeners,
      $slots,
      classList,
      handleKeydown,
      handleRadioClick,
      isDisabled,
      label,
      prefixedClass
    } = this;

    const tabIndex = isDisabled ? -1 : 0;

    const radioProps = {
      class: classList,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners,
        click: handleRadioClick
      },
      ref: 'radio'
    };

    const inputProps = {
      class: [`${prefixedClass}-input`],
      attrs: {
        tabindex: tabIndex
      },
      on: {
        keydown: handleKeydown
      },
      ref: 'input'
    };

    const children = $slots.default || label;

    return (
      <div {...radioProps}>
        <div {...inputProps}></div>
        <div class={`${prefixedClass}-label`}>{children}</div>
      </div>
    );
  }
};
