import mountTest from '../../../../tests/shared/mountTest';
import NovaCheckboxGroup from '@/components/checkbox/NovaCheckboxGroup';
import { mount } from '@vue/test-utils';
import NovaCheckbox from '@/components/checkbox/NovaCheckbox';
import flushPromises from 'flush-promises';

describe('NovaCheckboxGroup.vue', () => {
  mountTest(NovaCheckboxGroup);

  it('should work basically', async () => {
    const onChange = jest.fn();
    const wrapper = mount({
      data() {
        return {
          value: []
        };
      },
      methods: {
        onUpdate(value) {
          this.value = value;
        }
      },
      render() {
        let items = ['Apple', 'Pear', 'Orange'].map(item => {
          return <NovaCheckbox value={item.toLowerCase()}>{item}</NovaCheckbox>;
        });

        return (
          <NovaCheckboxGroup
            value={this.value}
            onUpdate={this.onUpdate}
            onChange={onChange}
          >
            {items}
          </NovaCheckboxGroup>
        );
      }
    });
    wrapper
      .findAll('.nova-ui-checkbox-input')
      .at(0)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenLastCalledWith(['apple']);
    wrapper
      .findAll('.nova-ui-checkbox-input')
      .at(1)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'pear']);
    wrapper
      .findAll('.nova-ui-checkbox-input')
      .at(2)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'pear', 'orange']);
    wrapper
      .findAll('.nova-ui-checkbox-input')
      .at(1)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'orange']);
  });
});
