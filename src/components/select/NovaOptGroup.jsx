import Storage from '@/utils/storage';

export default {
  name: 'NovaOptGroup',
  inject: ['NovaSelect'],
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-select`
    },
    label: {
      type: String,
      default: ''
    }
  },
  render() {
    const {
      $attrs,
      $listeners,
      $slots,
      label,
      NovaSelect,
      prefixedClass
    } = this;

    const slotLabel = $slots.label || label;
    const children = $slots.default;

    const optionGroupProps = {
      class: `${prefixedClass}-option-group`,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      }
    };

    let labelNode;
    if (NovaSelect.dropdownLoaded) {
      labelNode = (
        <div class={`${prefixedClass}-option-group-label`}>{slotLabel}</div>
      );
    }

    return (
      <div {...optionGroupProps}>
        {labelNode}
        <div class={`${prefixedClass}-option-group-content`}>{children}</div>
      </div>
    );
  }
};
