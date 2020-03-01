import { mount } from '@vue/test-utils';
import NovaAlert from '@/components/alert/NovaAlert';

describe('NovaAlert.vue', () => {
  it('could be closed', () => {
    const onClose = jest.fn();
    const wrapper = mount({
      render() {
        return (
          <NovaAlert type="warning" block border closable onClose={onClose}>
            Warning Text Warning Text Warning Text Warning Text Warning Text
            Warning TextWarning Text
          </NovaAlert>
        );
      }
    });
    wrapper.find('.nova-ui-alert-close').trigger('click');
    expect(onClose).toHaveBeenCalled();
  });

  describe('data and aria props', () => {
    it('set data attributes on alert', () => {
      const wrapper = mount({
        render() {
          return <NovaAlert data-test="test-id" data-id="12345" />;
        }
      });
      expect(wrapper.attributes('data-test')).toBe('test-id');
      expect(wrapper.attributes('data-id')).toBe('12345');
    });

    it('set aria attributes on alert', () => {
      const wrapper = mount({
        render() {
          return <NovaAlert aria-describedby="some-label" />;
        }
      });
      expect(wrapper.attributes('aria-describedby')).toBe('some-label');
    });

    it('sets role attribute on alert', () => {
      const wrapper = mount({
        render() {
          return <NovaAlert role="status" />;
        }
      });
      expect(wrapper.attributes('role')).toBe('status');
    });
  });
});
