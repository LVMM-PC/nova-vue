import Inventory from '../../utils/inventory';
import zhCN from '@/locales/zh-CN';
import holiday from '@/locales/holiday/zh-CN';
import { provide, reactive } from '@vue/composition-api';

export default {
  name: 'NovaLocale',
  provide() {
    return {
      NovaLocale: this
    };
  },
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-locale`
    },
    block: {
      type: Boolean,
      default: true
    },
    holiday: {
      type: Object,
      default: () => {
        return holiday;
      }
    },
    locale: {
      type: Object,
      default: () => {
        return zhCN;
      }
    }
  },
  setup(props) {
    const state = reactive({
      locale: props.locale,
      holiday: props.holiday
    });
    provide(Inventory.localeSymbol, state);
  },
  render() {
    const { $attrs, $listeners, $slots, block, prefixedClass } = this;

    const classList = [prefixedClass, { [`${prefixedClass}-block`]: block }];

    const children = $slots.default;

    const localeProps = {
      class: classList,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      }
    };

    return <div {...localeProps}>{children}</div>;
  }
};
