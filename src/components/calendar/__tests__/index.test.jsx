import mountTest from '../../../../tests/shared/mountTest';
import NovaCalendar from '@/components/calendar/NovaCalendar';
import { mount } from '@vue/test-utils';
import zhTW from '@/locales/lang/zh-TW';
import dayjs from 'dayjs';

describe('NovaCalendar.vue', () => {
  mountTest(NovaCalendar);

  it('Calendar should support locale', function() {
    const wrapper = mount({
      data() {
        return { date: dayjs('2000-01-01').toDate() };
      },
      render() {
        return <NovaCalendar vModel={this.date} locale={zhTW} />;
      }
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should trigger panelChange when click next or prev', () => {
    const onPanelChange = jest.fn();
    const wrapper = mount({
      data() {
        return { date: dayjs('2000-01-01').toDate() };
      },
      render() {
        return <NovaCalendar onPanelChange={onPanelChange}></NovaCalendar>;
      }
    });
    wrapper.find('.nova-calendar-next').trigger('click');
    expect(onPanelChange).toHaveBeenCalledTimes(1);
    wrapper.find('.nova-calendar-prev').trigger('click');
    expect(onPanelChange).toHaveBeenCalledTimes(2);
  });

  it('dateCellRender', () => {
    const wrapper = mount({
      data() {
        return { date: dayjs('2000-01-01') };
      },
      render() {
        return (
          <NovaCalendar>
            <div slot="dateCellRender" class="bamboo">
              Light
            </div>
          </NovaCalendar>
        );
      }
    });
    expect(
      wrapper
        .findAll('.bamboo')
        .at(0)
        .text()
    ).toEqual('Light');
  });
});
