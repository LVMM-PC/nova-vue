import PortalVue from 'portal-vue';
import nova, {
  NovaLocale,
  NovaSelect,
  NovaOption,
  NovaDropdown,
  NovaDatePicker,
  NovaCalendar,
  NovaAlert,
  NovaAutocomplete,
  NovaRadio,
  NovaRadioGroup,
  NovaCheckbox,
  NovaCheckboxGroup
} from '../..';
import '../../dist/nova.css';

export default ({ Vue }) => {
  Vue.use(PortalVue);

  if (typeof window !== 'undefined') {
    window.nova = nova;
  } else if (typeof global !== 'undefined') {
    global.nova = nova;
  }

  Vue.component('NovaLocale', NovaLocale);
  Vue.component('NovaSelect', NovaSelect);
  Vue.component('NovaOption', NovaOption);
  Vue.component('NovaDropdown', NovaDropdown);
  Vue.component('NovaDatePicker', NovaDatePicker);
  Vue.component('NovaCalendar', NovaCalendar);
  Vue.component('NovaAlert', NovaAlert);
  Vue.component('NovaAutocomplete', NovaAutocomplete);
  Vue.component('NovaRadio', NovaRadio);
  Vue.component('NovaRadioGroup', NovaRadioGroup);
  Vue.component('NovaCheckbox', NovaCheckbox);
  Vue.component('NovaCheckboxGroup', NovaCheckboxGroup);
};
