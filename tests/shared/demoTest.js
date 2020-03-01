import Vue from 'vue';
import glob from 'glob';
import { mount } from '@vue/test-utils';

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

global.nova = nova;

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

export default function demoTest(component) {
  const files = glob.sync(
    `./docs/.vuepress/components/demo/${component}/*.vue`
  );

  files.forEach(file => {
    test(`renders ${file} correctly`, () => {
      const temp = require(`../.${file}`);
      const demo = temp.default || temp;
      const wrapper = mount(demo);
      expect(wrapper).toMatchSnapshot();
    });
  });
}
