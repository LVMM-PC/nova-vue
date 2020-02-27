<template>
  <div>
    <div class="calendar-box">
      <div class="calendar-title">日历</div>
      <NovaCalendar
        :month-size="2"
        v-model="calendarDate"
        :disabledDate="disabledDateBefore"
        :disabledMonthPrev="disabledMonthPrev"
        :disabledMonthNext="disabledMonthNext"
        @panelChange="handlePanelChange"
      >
        <template slot="dateCellRender" slot-scope="scope">
          <div class="date-cell" @mouseenter="handleCellEnter($event, scope)">
            <div class="calendar-num">
              {{ getDayOfMonth(scope.date) }}
            </div>
            <div class="calendar-labels">
              <div
                class="calendar-label calendar-rest"
                v-if="getHoliday(scope.date)"
                :title="getHoliday(scope.date).title"
              >
                休
              </div>
            </div>
          </div>
        </template>
      </NovaCalendar>

      <div class="calendar-footer">
        <a href="" class="calendar-more">
          <template>{{ moment(calendarDate).format('YYYY-MM') }}</template>
          <template>{{ '更多' }}</template>
        </a>
      </div>
    </div>
    <div class="calendar-box">
      <div class="calendar-title">Calendar</div>
      <NovaLocale :locale="en">
        <NovaCalendar></NovaCalendar>
      </NovaLocale>
    </div>
  </div>
</template>

<script>
import holiday from '@/locales/holiday/china';
import NovaCalendar from '@/components/calendar/NovaCalendar';
import moment from 'moment';
import NovaLocale from '@/components/locale/NovaLocale';
import en from '@/locales/lang/en';

export default {
  name: 'CalendarDemo',
  components: { NovaLocale, NovaCalendar },
  data() {
    return {
      en,
      moment,
      holiday,
      calendarDate: moment()
        .add(0, 'months')
        .toDate()
    };
  },
  methods: {
    getHoliday(date) {
      return this.holiday[moment(date).format('YYYY-MM-DD')];
    },
    getDayOfMonth(date) {
      return moment(date).date();
    },
    disabledDateBefore(current) {
      // Can not select days before today and today
      let today = moment()
        .startOf('day')
        .toDate();
      return current && current < today;
    },
    disabledMonthPrev(date) {
      let thisMonth = moment().startOf('month');
      return thisMonth.isSameOrAfter(date, 'month');
    },
    disabledMonthNext(date) {
      let thisMonth = moment().startOf('month');
      let sixMonthLater = thisMonth.add(6, 'months');
      return sixMonthLater.isSameOrBefore(date);
    },
    handlePanelChange(date) {
      console.log(moment(date).format('YYYY-MM-DD'));
    },
    handleCellEnter(e, scope) {
      console.log(scope);
    }
  }
};
</script>

<style lang="less" scoped>
.calendar-box {
  margin-top: 45px;
  width: 1196px;
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
  &:before {
    content: '';
    background-image: url(../../assets/icons/calendar-more.svg);
    width: 10px;
    height: 10px;
    float: right;
    vertical-align: top;
    display: inline-block;
    margin-top: 5px;
  }
}

.calendar-num {
  position: absolute;
  top: 10px;
  left: 10px;
  line-height: 12px;
  width: 100px;
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
  width: 159px;
  height: 94px;
}
</style>
