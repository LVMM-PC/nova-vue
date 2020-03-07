import NovaDatePicker from '@/components/date-picker/NovaDatePicker';
import { mount } from '@vue/test-utils';
import dayjs from 'dayjs';
import flushPromises from 'flush-promises';
import zhTW from '@/locales/lang/zh-TW';

describe('NovaDatePicker.vue type:range', () => {
  it('prop locale should works', async () => {
    const wrapper = mount({
      data() {
        let startDate = dayjs('2020-01-01')
          .startOf('day')
          .toDate();
        let endDate = dayjs('2020-12-31')
          .startOf('day')
          .toDate();
        return {
          someRange: [startDate, endDate]
        };
      },
      render() {
        return (
          <NovaDatePicker
            type="range"
            locale={zhTW}
            holiday={{}}
            value={this.someRange}
          />
        );
      }
    });
    wrapper.vm.$children[0].open('start');
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });

  it('disabled date', async function() {
    function disabledDate(current) {
      let someDate = dayjs('2020-01-15')
        .startOf('day')
        .toDate();
      return current > someDate;
    }

    const wrapper = mount({
      data() {
        let startDate = dayjs('2020-01-01')
          .startOf('day')
          .toDate();
        let endDate = dayjs('2020-12-31')
          .startOf('day')
          .toDate();
        return {
          someRange: [startDate, endDate]
        };
      },
      render() {
        return (
          <NovaDatePicker
            type='range'
            holiday={{}}
            value={this.someRange}
            disabledDate={disabledDate}
          />
        );
      }
    });
    wrapper.vm.$children[0].open('start');
    await flushPromises();
    expect(wrapper).toMatchSnapshot();
  });
});
