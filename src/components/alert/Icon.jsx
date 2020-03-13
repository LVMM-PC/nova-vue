export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  render() {
    const { $attrs, $listeners, type } = this;

    const classList = ['nova-alert-icon', `nova-alert-icon-${type}`];

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
