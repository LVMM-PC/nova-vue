import Storage from '@/utils/storage';

export default {
  name: 'NovaOption',
  inject: ['NovaSelect'],
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-select`
    },
    disabled: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Boolean],
      default: null
    }
  },
  computed: {
    classList() {
      const { isSelected, disabled, prefixedClass } = this;

      return [
        `${prefixedClass}-option`,
        {
          'is-selected': isSelected,
          'is-disabled': disabled
        }
      ];
    },
    isSelected() {
      const NovaSelect = this.NovaSelect;
      const selected = NovaSelect.getValue();
      const value = this.value;
      let isSelected = false;

      if (NovaSelect.multiple) {
        const found = selected.find(v => {
          return v === value;
        });
        if (found) {
          isSelected = true;
        }
      } else {
        if (selected === value) {
          isSelected = true;
        }
      }
      return isSelected;
    }
  },
  created() {
    this.NovaSelect.addMultipleOption({
      label: this.label,
      value: this.value
    });
  },
  methods: {
    handleClick(...args) {
      if (this.disabled) {
        return;
      }

      this.$emit('click', ...args);
      this.NovaSelect.setSelected(this.value);

      if (!this.NovaSelect.multiple) {
        this.NovaSelect.close();
      }
    }
  },
  render() {
    const {
      $attrs,
      $listeners,
      $slots,
      label,
      // value,
      classList,
      NovaSelect,
      handleClick
    } = this;

    const children = $slots.default || label || null?.toString();

    const optionProps = {
      class: classList,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners,
        click: handleClick
      }
    };

    const optionNode = <div {...optionProps}>{children}</div>;
    return NovaSelect.dropdownLoaded ? optionNode : null;
  }
};
