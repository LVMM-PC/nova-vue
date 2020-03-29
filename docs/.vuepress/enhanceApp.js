import {
  NovaAlert,
  NovaAutoComplete,
  NovaCalendar,
  NovaCheckbox,
  NovaCheckboxGroup,
  NovaDatePicker,
  NovaDropdown,
  NovaLocale,
  NovaOptGroup,
  NovaOption,
  NovaRadio,
  NovaRadioGroup,
  NovaSelect
} from 'nova-vue';
import '../../dist/nova.css';

export default ({ Vue }) => {
  Vue.component('NovaAlert', NovaAlert);
  Vue.component('NovaAutoComplete', NovaAutoComplete);
  Vue.component('NovaCalendar', NovaCalendar);
  Vue.component('NovaCheckbox', NovaCheckbox);
  Vue.component('NovaCheckboxGroup', NovaCheckboxGroup);
  Vue.component('NovaDatePicker', NovaDatePicker);
  Vue.component('NovaDropdown', NovaDropdown);
  Vue.component('NovaLocale', NovaLocale);
  Vue.component('NovaOptGroup', NovaOptGroup);
  Vue.component('NovaOption', NovaOption);
  Vue.component('NovaRadio', NovaRadio);
  Vue.component('NovaRadioGroup', NovaRadioGroup);
  Vue.component('NovaSelect', NovaSelect);
};
