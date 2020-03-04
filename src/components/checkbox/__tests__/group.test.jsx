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
      .findAll('.nova-checkbox-input')
      .at(0)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenLastCalledWith(['apple']);

    wrapper
      .findAll('.nova-checkbox-input')
      .at(1)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'pear']);

    wrapper
      .findAll('.nova-checkbox-input')
      .at(2)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'pear', 'orange']);

    wrapper
      .findAll('.nova-checkbox-input')
      .at(1)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenLastCalledWith(['apple', 'orange']);
  });

  it('does not trigger onChange callback of both Checkbox and CheckboxGroup when CheckboxGroup is disabled', async () => {
    const onChange = jest.fn();
    const onGroupChange = jest.fn();

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
            onChange={onGroupChange}
            disabled
          >
            {checkboxItems}
          </NovaCheckboxGroup>
        );
      }
    });

    wrapper
      .findAll('.nova-checkbox-input')
      .at(0)
      .trigger('click');
    await flushPromises();
    expect(onChange).not.toHaveBeenCalled();
    expect(onGroupChange).not.toHaveBeenCalled();

    wrapper
      .findAll('.nova-checkbox-input')
      .at(1)
      .trigger('click');
    await flushPromises();
    expect(onChange).not.toHaveBeenCalled();
    expect(onGroupChange).not.toHaveBeenCalled();
  });

  it('does not prevent onChange callback from Checkbox when CheckboxGroup is not disabled', async () => {
    const onChange = jest.fn();
    const onGroupChange = jest.fn();

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
            onChange={onGroupChange}
          >
            {checkboxItems}
          </NovaCheckboxGroup>
        );
      }
    });

    wrapper
      .findAll('.nova-checkbox-input')
      .at(0)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onGroupChange).toHaveBeenLastCalledWith(['apple']);

    wrapper
      .findAll('.nova-checkbox-input')
      .at(1)
      .trigger('click');
    await flushPromises();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onGroupChange).toHaveBeenLastCalledWith(['apple']);
  });

  it('should be controlled by value', async () => {
    const options = [
      { label: 'Apple', value: 'apple' },
      { label: 'Orange', value: 'orange' }
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
            <NovaCheckbox value={option.value}>{option.label}</NovaCheckbox>
          );
        });

        return (
          <NovaCheckboxGroup value={this.value} onUpdate={this.onUpdate}>
            {checkboxItems}
          </NovaCheckboxGroup>
        );
      }
    });

    expect(wrapper.vm.$data.value).toEqual([]);
    wrapper.setData({ value: ['apple'] });
    await flushPromises();
    expect(wrapper.vm.$data.value).toEqual(['apple']);
  });

  it('should trigger onChange in sub Checkbox', () => {
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
        return (
          <NovaCheckboxGroup value={this.value} onUpdate={this.onUpdate}>
            <NovaCheckbox value="my" onChange={onChange}>
              My
            </NovaCheckbox>
          </NovaCheckboxGroup>
        );
      }
    });

    wrapper
      .findAll('.nova-checkbox-input')
      .at(0)
      .trigger('click');
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith(true);
  });

  it('should work when checkbox is wrapped by other components', async () => {
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
        return (
          <NovaCheckboxGroup value={this.value} onUpdate={this.onUpdate}>
            <div>
              <NovaCheckbox value={1}>1</NovaCheckbox>
            </div>
          </NovaCheckboxGroup>
        );
      }
    });

    wrapper
      .findAll('.nova-checkbox')
      .at(0)
      .trigger('click');
    await flushPromises();
    expect(wrapper.vm.$data.value).toEqual([1]);

    wrapper
      .findAll('.nova-checkbox')
      .at(0)
      .trigger('click');
    await flushPromises();
    expect(wrapper.vm.$data.value).toEqual([]);
  });
});
