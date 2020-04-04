import { createElement } from '@vue/composition-api';
import Inventory from '@/utils/inventory';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'NovaInput',
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-input`
    }
  },
  setup: (props, context) => {
    const { attrs, listeners } = context;

    const inputProps = {
      class: [props.prefixedClass, props.class],
      props,
      attrs,
      on: listeners
    };

    return () => {
      return <input {...inputProps} />;
    };
  }
};
