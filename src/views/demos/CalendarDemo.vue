<template>
  <div>
    <div class="calendar-box">
      <div class="calendar-title">日历</div>
      <NovaCalendar
        v-model="calendarDate"
        :disabled-date="disabledDateBefore"
        :disabled-month-next="disabledMonthNext"
        :disabled-month-prev="disabledMonthPrev"
        :month-size="2"
        @panelChange="handlePanelChange"
      >
        <template v-slot:dateCellRender="slotProps">
          <div class="date-cell">
            <div class="calendar-num">
              {{ getDayOfMonth(slotProps.date) }}
            </div>
            <div class="calendar-labels">
              <div
                v-if="getHoliday(slotProps.date)"
                :title="getHoliday(slotProps.date).title"
                class="calendar-label calendar-rest"
              >
                休
              </div>
            </div>
          </div>
        </template>
      </NovaCalendar>

      <div class="calendar-footer">
        <a class="calendar-more" href="">
          <template>{{ dayjs(calendarDate).format('YYYY-MM') }}</template>
          <template>{{ '更多' }}</template>
          <NovaIconRight></NovaIconRight>
        </a>
      </div>
    </div>
    <div class="calendar-box">
      <div class="calendar-title">Calendar</div>
      <NovaLocale :locale="en" block>
        <NovaCalendar></NovaCalendar>
      </NovaLocale>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import holiday from '@/locales/holiday/zh-CN';
import NovaCalendar from '@/components/calendar/NovaCalendar';
import NovaLocale from '@/components/locale/NovaLocale';
import en from '@/locales/en';
import NovaIconRight from '@/icons/NovaIconRight';

export default {
  name: 'CalendarDemo',
  components: { NovaIconRight, NovaLocale, NovaCalendar },
  data() {
    return {
      en,
      dayjs,
      holiday,
      calendarDate: dayjs()
        .add(0, 'month')
        .toDate()
    };
  },
  methods: {
    getHoliday(date) {
      return this.holiday[dayjs(date).format('YYYY-MM-DD')];
    },
    getDayOfMonth(date) {
      return dayjs(date).date();
    },
    disabledDateBefore(current) {
      // Can not select days before today and today
      let today = dayjs()
        .startOf('day')
        .toDate();
      return current && current < today;
    },
    disabledMonthPrev(date) {
      let thisMonth = dayjs().startOf('month');
      return (
        thisMonth.isSame(date, 'month') || thisMonth.isAfter(date, 'month')
      );
    },
    disabledMonthNext(date) {
      let thisMonth = dayjs().startOf('month');
      let sixMonthLater = thisMonth.add(6, 'month');
      return sixMonthLater.isSame(date) || sixMonthLater.isBefore(date);
    },
    handlePanelChange(date) {
      console.log(dayjs(date).format('YYYY-MM-DD'));
    }
  }
};
</script>

<style lang="less" scoped>
.calendar-box {
  margin-top: 45px;
  border: 2px solid #f90;
}

.calendar-title {
  height: 49px;
  background: #fffaee;
  font-size: 22px;
  font-weight: normal;
  text-align: center;
  line-height: 49px;
}

.calendar-footer {
  height: 40px;
  line-height: 20px;
  padding: 10px;
  box-sizing: border-box;
  text-align: right;
  margin-right: 20px;
  font-size: 12px;

  a {
    color: #29e;
    text-decoration: none;
  }
}

.calendar-more {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.calendar-num {
  position: absolute;
  top: 10px;
  left: 10px;
  line-height: 12px;
  height: 12px;
}

.calendar-labels {
  position: absolute;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  top: 0;
  text-align: right;
  font-size: 0;
  padding: 5px;

  .calendar-label {
    font-size: 12px;
    display: inline-block;
    vertical-align: top;
    text-indent: 0;
    color: #fff;
    background-color: #333;
    text-align: center;
    padding: 0 1px;
    height: 16px;
    line-height: 16px;
    margin-left: 2px;
    font-weight: normal;
  }

  .calendar-rest {
    background: #fa0;
  }
}

.date-cell {
  height: 94px;
}
</style>
