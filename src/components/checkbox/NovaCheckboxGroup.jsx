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
      let found = this.value.find(item => {
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
    const { $attrs, $listeners, $slots } = this;

    const children = $slots.default;

    const groupProps = {
      class: 'nova-checkbox-group',
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
