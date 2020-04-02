import mountTest from '../../../../tests/shared/mountTest';
import NovaAutoComplete from '@/components/auto-complete/NovaAutoComplete';
import { mount } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import { Utils } from '../../../../tests/utils';

describe('NovaAutoComplete', () => {
  mountTest(NovaAutoComplete);

  it('autoComplete should work when dataSource is object array', async () => {
    const wrapper = mount({
      data() {
        return {
          value: '123'
        };
      },
      methods: {
        querySearch(searchText, setResult) {
          setResult([
            { value: '12345' },
            { value: '23456' },
            { value: '34567' }
          ]);
        }
      },
      render() {
        const { querySearch, value } = this;
        return (
          <NovaAutoComplete
            vModel={value}
            focusSearch={true}
            fetchSuggestions={querySearch}
          />
        );
      }
    });

    expect(wrapper.findAll('input').length).toBe(1);

    const input = wrapper.find('input');
    input.trigger('focus');
    await flushPromises();
    await Utils.sleep(200);

    expect(wrapper.findAll('.nova-auto-complete-item').length).toBe(3);
  });
});
