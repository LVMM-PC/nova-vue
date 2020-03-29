import Vue from 'vue';
import PortalVue from 'portal-vue';
import ClientOnly from 'vue-client-only';

export { version } from '../package.json';

Vue.use(PortalVue);
Vue.component('ClientOnly', ClientOnly);

export en from './locales/en';
export zhCN from './locales/zh-CN';
export zhTW from './locales/zh-TW';

export holidayZhCN from './locales/holiday/zh-CN';

export NovaAlert from './components/alert/NovaAlert.jsx';
export NovaAutoComplete from './components/auto-complete/NovaAutoComplete.jsx';
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
export NovaProgress from './components/progress/NovaProgress.jsx';

export * from './icons/index';
