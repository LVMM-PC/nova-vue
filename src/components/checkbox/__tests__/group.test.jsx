import flushPromises from 'flush-promises';
import { mount } from '@vue/test-utils';
import mountTest from '../../../../tests/shared/mountTest';
import NovaCheckbox from '@/components/checkbox/NovaCheckbox';
import NovaCheckboxGroup from '@/components/checkbox/NovaCheckboxGroup';

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
        let checkboxItems = ['Apple', 'Pear', 'Orange'].map(option => {
          return (
            <NovaCheckbox value={option.toLowerCase()}>{option}</NovaCheckbox>
          );
        });

        return (
          <NovaCheckboxGroup
            value={this.value}
            onUpdate={this.onUpdate}
            onChange={onChange}
          >
            {checkboxItems}
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

  it('does not trigger onChange callback of both Checkbox and CheckboxGroup when CheckboxGroup is disabled', async () => {
    const onChange = jest.fn();
    const onChangeGroup = jest.fn();

    const options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Pear', value: 'pear' }
    ];

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
        let checkboxItems = options.map(option => {
          return (
            <NovaCheckbox value={option.value} onChange={onChange}>
              {option.label}
            </NovaCheckbox>
          );
        });

        return (
          <NovaCheckboxGroup
            value={this.value}
            onUpdate={this.onUpdate}
            onChange={onChangeGroup}
            disabled
          >
            {checkboxItems}
          </NovaCheckboxGroup>
        );
      }
    });

    wrapper
      .findAll('.nova-ui-checkbox-input')
      .at(0)
      .trigger('click');
    await flushPromises();
    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeGroup).not.toHaveBeenCalled();

    wrapper
      .findAll('.nova-ui-checkbox-input')
      .at(1)
      .trigger('click');
    await flushPromises();
    expect(onChange).not.toHaveBeenCalled();
    expect(onChangeGroup).not.toHaveBeenCalled();
  });

  it('does not prevent onChange callback from Checkbox when CheckboxGroup is not disabled', async () => {
    const onChange = jest.fn();
    const onChangeGroup = jest.fn();

    const options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Orange', value: 'orange', disabled: true }
    ];

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
        let checkboxItems = options.map(option => {
          return (
            <NovaCheckbox
              value={option.value}
              onChange={onChange}
              disabled={option.disabled}
            >
              {option.label}
            </NovaCheckbox>
          );
        });

        return (
          <NovaCheckboxGroup
            value={this.value}
            onUpdate={this.onUpdate}
            onChange={onChangeGroup}
          >
            {checkboxItems}
          </NovaCheckboxGroup>
        );
      }
    });

    wrapper
      .findAll('.nova-ui-checkbox-input')
      .at(0)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChangeGroup).toHaveBeenLastCalledWith(['apple']);

    wrapper
      .findAll('.nova-ui-checkbox-input')
      .at(1)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChangeGroup).toHaveBeenLastCalledWith(['apple']);
  });
});
