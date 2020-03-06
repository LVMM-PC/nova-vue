import { mount } from '@vue/test-utils';

export default function mountTest(Component) {
  describe(`mount and unmount`, () => {
    it(`component could be updated and unmounted without error`, () => {
      const wrapper = mount(Component);
      expect(() => {
        wrapper.setProps({});
        wrapper.destroy();
      }).not.toThrow();
    });
  });
}
