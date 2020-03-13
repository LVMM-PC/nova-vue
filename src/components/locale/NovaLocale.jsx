import zhCN from '@/locales/lang/zh-CN';
import holiday from '@/locales/holiday/china';

export default {
  name: 'NovaLocale',
  provide() {
    return {
      NovaLocale: this
    };
  },
  props: {
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
    const { block, $attrs, $slots, $listeners } = this;

    const classList = { 'nova-locale': true, 'nova-locale-block': block };

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
