import Storage from '@/utils/storage';

export default {
  name: 'NovaRadioGroup',
  provide() {
    return {
      NovaRadioGroup: this
    };
  },
  model: {
    event: 'update'
  },
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-radio`
    },
    value: {
      type: [Number, Boolean, String],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setChecked(value, trigger) {
      if (value === this.value) {
        return;
      }

      this.$emit('update', value);
      if (trigger) {
        this.$emit('change', value);
      }
    },
    getChecked() {
      return this.value;
    }
  },
  render() {
    const { $attrs, $listeners, $slots, prefixedClass } = this;

    const groupProps = {
      class: `${prefixedClass}-group`,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      },
      ref: 'radio-group'
    };

    const children = $slots.default;

    return <div {...groupProps}>{children}</div>;
  }
};
