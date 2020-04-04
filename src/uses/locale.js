import { inject } from '@vue/composition-api';
import Inventory from '../utils/inventory';
import Utils from '@/utils/utils';
import zhCN from '@/locales/zh-CN';
import holiday from '@/locales/holiday/zh-CN';

export const localeProps = {
  locale: {
    type: Object
  },
  holiday: {
    type: Object
  }
};

export function useLocale(props) {
  const provideLocale = inject(Inventory.localeSymbol, null);

  function getNovaLocale() {
    const novaLocale = Utils.mergeOptions({}, zhCN);

    if (provideLocale) {
      Utils.mergeOptions(novaLocale, provideLocale.locale);
    }
    if (props.locale) {
      Utils.mergeOptions(novaLocale, props.locale);
    }

    return novaLocale;
  }

  function getNovaHoliday() {
    const novaHoliday = Utils.mergeOptions({}, holiday);

    if (props.holiday) {
      return props.holiday;
    }
    if (provideLocale) {
      return provideLocale.holiday;
    }

    return novaHoliday;
  }

  const novaLocale = getNovaLocale();
  const novaHoliday = getNovaHoliday();

  return {
    novaLocale,
    novaHoliday
  };
}
