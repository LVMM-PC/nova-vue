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
    let novaLocale = this.getNovaLocale();
    let novaHoliday = this.getNovaHoliday();
    return {
      novaLocale: novaLocale,
      novaHoliday: novaHoliday
    };
  },
  methods: {
    getNovaLocale() {
      let novaLocale = Utils.mergeOptions({}, zhCN);
      if (this.NovaLocale) {
        Utils.mergeOptions(novaLocale, this.NovaLocale.locale);
      }
      if (this.locale) {
        Utils.mergeOptions(novaLocale, this.locale);
      }

      return novaLocale;
    },
    getNovaHoliday() {
      let novaHoliday = Utils.mergeOptions({}, holiday);
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
