import NovaDatePicker from '@/components/date-picker/NovaDatePicker';
import { mount } from '@vue/test-utils';
import dayjs from 'dayjs';
import flushPromises from 'flush-promises';
import zhTW from '@/locales/lang/zh-TW';

describe('NovaDatePicker', () => {
  it('prop locale should works', async () => {
    const wrapper = mount({
      data() {
        return {
          birthday: dayjs('2000-01-01')
            .startOf('day')
            .toDate()
        };
      },
      render() {
        return (
          <NovaDatePicker locale={zhTW} holiday={{}} vModel={this.birthday} />
        );
      }
    });
    wrapper.vm.$children[0].open();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it('disabled date', async function() {
    function disabledDate(current) {
      let someDate = dayjs('2000-01-15')
        .startOf('day')
        .toDate();
      return current > someDate;
    }

    const wrapper = mount({
      data() {
        return {
          birthday: dayjs('2000-01-01')
            .startOf('day')
            .toDate()
        };
      },
      render() {
        return (
          <NovaDatePicker
            holiday={null}
            vModel={this.birthday}
            disabledDate={disabledDate}
          />
        );
      }
    });
    wrapper.vm.$children[0].open();
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });
});
