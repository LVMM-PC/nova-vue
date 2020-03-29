import Storage from '@/utils/storage';
import zhCN from '@/locales/zh-CN';
import holiday from '@/locales/holiday/zh-CN';

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
      default: `${Storage.prefix}-locale`
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
