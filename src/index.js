import Vue from 'vue';
import PortalVue from 'portal-vue';
import ClientOnly from 'vue-client-only';

import { version } from '../package.json';

import './styles/common.less';

import en from './locales/lang/en';
import zhCN from './locales/lang/zh-CN';
import zhTW from './locales/lang/zh-TW';
import china from './locales/holiday/china';

Vue.use(PortalVue);
Vue.component('ClientOnly', ClientOnly);

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
  version,
  locale: {
    en,
    zhCN,
    zhTW
  },
  holiday: {
    china
  }
};
