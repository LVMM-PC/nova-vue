import Storage from '@/utils/storage';

export default {
  name: 'Icon',
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-alert`
    },
    type: {
      type: String,
      default: ''
    }
  },
  render() {
    const { $attrs, $listeners, prefixedClass, type } = this;

    const classList = [
      `${prefixedClass}-icon`,
      `${prefixedClass}-icon-${type}`
    ];

    const iconProps = {
      class: classList,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      }
    };

    return <div {...iconProps}></div>;
  }
};
