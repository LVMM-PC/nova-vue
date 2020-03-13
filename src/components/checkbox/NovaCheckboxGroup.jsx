import Storage from '@/utils/storage';

export default {
  name: 'NovaCheckboxGroup',
  provide() {
    return {
      NovaCheckboxGroup: this
    };
  },
  model: {
    event: 'update'
  },
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-checkbox`
    },
    value: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setChecked(checkedValue, checked, trigger) {
      let newValue;
      const found = this.value.find(item => {
        return item === checkedValue;
      });

      if (checked) {
        if (found) {
          return;
        }

        newValue = this.value.concat([checkedValue]);
      } else {
        if (!found) {
          return;
        }
        newValue = this.value.filter(item => {
          return item !== checkedValue;
        });
      }

      this.$emit('update', newValue);
      if (trigger) {
        this.$emit('change', newValue);
      }
    }
  },
  render() {
    const { $attrs, $listeners, $slots, prefixedClass } = this;

    const children = $slots.default;

    const groupProps = {
      class: `${prefixedClass}-group`,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      },
      ref: 'checkbox-group'
    };

    return <div {...groupProps}>{children}</div>;
  }
};
