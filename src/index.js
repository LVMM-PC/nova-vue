import Vue from 'vue';
import PortalVue from 'portal-vue';
import ClientOnly from 'vue-client-only';

import { version } from '../package.json';

import en from './locales/lang/en';
import zhCN from './locales/lang/zh-CN';
import zhTW from './locales/lang/zh-TW';
import china from './locales/holiday/china';

Vue.use(PortalVue);
Vue.component('ClientOnly', ClientOnly);

export NovaAlert from './components/alert/NovaAlert.jsx';
export NovaAutocomplete from './components/autocomplete/NovaAutocomplete.vue';
export NovaCalendar from './components/calendar/NovaCalendar.jsx';
export NovaCheckbox from './components/checkbox/NovaCheckbox.jsx';
export NovaCheckboxGroup from './components/checkbox/NovaCheckboxGroup.jsx';
export NovaDatePicker from './components/date-picker/NovaDatePicker.jsx';
export NovaDropdown from './components/dropdown/NovaDropdown.jsx';
export NovaLocale from './components/locale/NovaLocale.jsx';
export NovaOptGroup from './components/select/NovaOptGroup.jsx';
export NovaOption from './components/select/NovaOption.jsx';
export NovaRadio from './components/radio/NovaRadio.jsx';
export NovaRadioGroup from './components/radio/NovaRadioGroup.jsx';
export NovaSelect from './components/select/NovaSelect.jsx';

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
