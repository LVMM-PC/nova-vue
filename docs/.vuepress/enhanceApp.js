import Vue from 'vue';
import VueCompositionApi from '@vue/composition-api';

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
  NovaSelect,
  NovaProgress,
  NovaButton,
  NovaModal,
  NovaInput
} from 'nova-vue';
import '../../dist/nova.css';

Vue.use(VueCompositionApi);

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
  Vue.component('NovaProgress', NovaProgress);
  Vue.component('NovaButton', NovaButton);
  Vue.component('NovaModal', NovaModal);
  Vue.component('NovaInput', NovaInput);
};
