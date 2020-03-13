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

export NovaAutocomplete from './components/autocomplete/NovaAutocomplete.vue';
export NovaCalendar from './components/calendar/NovaCalendar.vue';
export NovaCheckbox from './components/checkbox/NovaCheckbox.vue';
export NovaCheckboxGroup from './components/checkbox/NovaCheckboxGroup.vue';
export NovaDatePicker from './components/date-picker/NovaDatePicker.vue';
export NovaOptGroup from './components/select/NovaOptGroup.vue';
export NovaOption from './components/select/NovaOption.vue';
export NovaRadio from './components/radio/NovaRadio.vue';
export NovaRadioGroup from './components/radio/NovaRadioGroup.vue';
export NovaSelect from './components/select/NovaSelect.vue';

export NovaAlert from './components/alert/NovaAlert.jsx';
export NovaDropdown from './components/dropdown/NovaDropdown.jsx';
export NovaLocale from './components/locale/NovaLocale.jsx';

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
