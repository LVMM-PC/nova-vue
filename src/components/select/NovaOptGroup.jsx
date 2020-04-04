import Inventory from '../../utils/inventory';

export default {
  name: 'NovaOptGroup',
  inject: ['NovaSelect'],
  isSelectOptGroup: true,
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-select`
    },
    label: {
      type: String,
      default: ''
    }
  },
  created() {
    this.NovaSelect.reload();
  },
  render() {
    const { $slots } = this;
    const children = $slots.default;

    return <div>{children}</div>;
  }
};
