export const version = '0.1.0';

export NovaLocale from './components/locale/NovaLocale';
export NovaSelect from './components/select/NovaSelect';
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

import en from './locales/lang/en';
import zhCN from './locales/lang/zh-CN';

export const locale = {
  en,
  zhCN
};

import china from './locales/holiday/china';

export const holiday = {
  china
};
