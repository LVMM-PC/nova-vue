import Vue from 'vue';
import glob from 'glob';
import dayjs from 'dayjs';
import MockDate from 'mockdate';
import { mount } from '@vue/test-utils';
import {
  NovaAlert,
  NovaAutocomplete,
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
} from '../../src/index';

Vue.component('NovaLocale', NovaLocale);
Vue.component('NovaSelect', NovaSelect);
Vue.component('NovaOptGroup', NovaOptGroup);
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
      MockDate.set(dayjs('2000-01-01').toDate());
      const temp = require(`../.${file}`);
      const demo = temp.default || temp;
      const wrapper = mount(demo);
      expect(wrapper).toMatchSnapshot();
      MockDate.reset();
    });
  });
}
