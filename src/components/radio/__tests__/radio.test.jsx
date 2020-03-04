import mountTest from '../../../../tests/shared/mountTest';
import NovaRadio from '@/components/radio/NovaRadio';
import { mount } from '@vue/test-utils';

describe('NovaRadio.vue', () => {
  mountTest(NovaRadio);

  it('should render correctly', () => {
    const wrapper = mount({
      render() {
        return <NovaRadio class="customized" />;
      }
    });
    expect(wrapper).toMatchSnapshot();
  });
});
