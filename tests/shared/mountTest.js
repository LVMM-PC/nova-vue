import Vue from 'vue';
import { mount } from '@vue/test-utils';
import ClientOnly from '../__mocks__/lib/ClientOnly';
import MountingPortal from '../__mocks__/lib/MountingPortal';

Vue.component('ClientOnly', ClientOnly);
Vue.component('MountingPortal', MountingPortal);

export default function mountTest(Component) {
  describe(`mount an unmount`, () => {
    it(`component could be updated and unmounted without error`, () => {
      const wrapper = mount(Component);
      expect(() => {
        wrapper.setProps({});
        wrapper.destroy();
      }).not.toThrow();
    });
  });
}
