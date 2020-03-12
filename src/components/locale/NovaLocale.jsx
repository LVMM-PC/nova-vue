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
    let { block, $attrs, $slots, $listeners } = this;
    let classList = { 'nova-locale': true, 'nova-locale-block': block };
    let children = $slots.default;

    return (
      <div class={classList} props={$attrs} on={$listeners}>
        {children}
      </div>
    );
  }
};
