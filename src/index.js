import en from './locales/lang/en';
import zhCN from './locales/lang/zh-CN';
import china from './locales/holiday/china';

export NovaLocale from './components/locale/NovaLocale';
export NovaSelect from './components/select/NovaSelect';
export NovaOptGroup from './components/select/NovaOptGroup';
export NovaOption from './components/select/NovaOption';
export NovaDropdown from './components/dropdown/NovaDropdown';
export NovaDatePicker from './components/date-picker/NovaDatePicker';
export NovaCalendar from './components/calendar/NovaCalendar';
export NovaAlert from './components/alert/NovaAlert';
export NovaAutocomplete from './components/autocomplete/NovaAutocomplete';
export NovaRadio from './components/radio/NovaRadio';
export NovaRadioGroup from './components/radio/NovaRadioGroup';
export NovaCheckbox from './components/checkbox/NovaCheckbox';
export NovaCheckboxGroup from './components/checkbox/NovaCheckboxGroup';

export default {
  version: '0.1.0',
  locale: {
    en,
    zhCN
  },
  holiday: {
    china
  }
};
