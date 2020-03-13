import mountTest from '../../../../tests/shared/mountTest';
import NovaRadioGroup from '@/components/radio/NovaRadioGroup';
import NovaRadio from '@/components/radio/NovaRadio';
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';

describe('NovaRadioGroup', () => {
  mountTest(NovaRadioGroup);

  function createRadioGroup(groupProps, options = null) {
    if (!options) {
      options = [
        { props: { value: 'a', label: 'A' } },
        { props: { value: 'b', label: 'B' } },
        { props: { value: 'c', label: 'C' } }
      ];
    }

    return {
      data() {
        return {
          value: null
        };
      },
      methods: {
        onUpdate(value) {
          this.value = value;
        }
      },
      render() {
        const radioItems = options.map(option => {
          return <NovaRadio {...option}></NovaRadio>;
        });
        return (
          <NovaRadioGroup
            value={this.value}
            onUpdate={this.onUpdate}
            {...groupProps}
          >
            {radioItems}
          </NovaRadioGroup>
        );
      }
    };
  }

  it('fire change events when value changes', async () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        on: {
          change: onChange
        }
      })
    );
    const radios = wrapper.findAll('.nova-radio');

    wrapper.setData({ value: 'b' });
    await flushPromises();
    radios.at(0).trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(1);

    wrapper.setData({ value: 'a' });
    await flushPromises();
    radios.at(1).trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('both of radio and radioGroup will trigger event when they exists', async () => {
    const onChange = jest.fn();
    const onGroupChange = jest.fn();

    const wrapper = mount(
      createRadioGroup(
        {
          on: {
            change: onGroupChange
          }
        },
        [
          { props: { value: 'a', label: 'A' }, on: { change: onChange } },
          { props: { value: 'b', label: 'B' }, on: { change: onChange } },
          { props: { value: 'c', label: 'C' }, on: { change: onChange } }
        ]
      )
    );
    const radios = wrapper.findAll('.nova-radio');

    wrapper.setData({ value: 'b' });
    await flushPromises();
    radios.at(0).trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onGroupChange).toHaveBeenCalledTimes(1);

    wrapper.setData({ value: 'a' });
    await flushPromises();
    radios.at(1).trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onGroupChange).toHaveBeenCalledTimes(2);
  });

  it(`won't fire change events when value not changes`, async () => {
    const onChange = jest.fn();

    const wrapper = mount(
      createRadioGroup({
        on: {
          change: onChange
        }
      })
    );
    const radios = wrapper.findAll('.nova-radio');

    wrapper.setData({ value: 'b' });
    await flushPromises();
    radios.at(1).trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(0);

    wrapper.setData({ value: 'a' });
    await flushPromises();
    radios.at(0).trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(0);
  });
});
