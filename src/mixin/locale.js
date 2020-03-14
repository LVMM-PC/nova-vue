import zhCN from '@/locales/lang/zh-CN';
import holiday from '@/locales/holiday/china';
import Utils from '@/utils/utils';

export default {
  inject: {
    NovaLocale: {
      default: null
    }
  },
  props: {
    locale: {
      type: Object
    },
    holiday: {
      type: Object
    }
  },
  data() {
    const novaLocale = this.getNovaLocale();
    const novaHoliday = this.getNovaHoliday();
    return {
      novaLocale: novaLocale,
      novaHoliday: novaHoliday
    };
  },
  methods: {
    getNovaLocale() {
      const novaLocale = Utils.mergeOptions({}, zhCN);
      if (this.NovaLocale) {
        Utils.mergeOptions(novaLocale, this.NovaLocale.locale);
      }
      if (this.locale) {
        Utils.mergeOptions(novaLocale, this.locale);
      }

      return novaLocale;
    },
    getNovaHoliday() {
      const novaHoliday = Utils.mergeOptions({}, holiday);
      if (this.NovaLocale) {
        return this.NovaLocale.holiday;
      }
      if (this.holiday) {
        return this.holiday;
      }

      return novaHoliday;
    }
  }
};
