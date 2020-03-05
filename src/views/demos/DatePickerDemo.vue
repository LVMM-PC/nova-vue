<template>
  <div class="box">
    <div class="box">
      <NovaLocale>
        <NovaDatePicker
          v-model="emptyDate"
          @open="handleOpen"
          @close="handleClose"
          @change="handleChange"
          @click="handleClick"
          :disabledDate="disabledDateBefore"
          popover-class="test"
          @focus="handleInputFocus"
          placeholder="请选择日期"
          ref="my-date-picker"
        ></NovaDatePicker>
      </NovaLocale>
      <NovaLocale :locale="en" :holiday="hideHoliday">
        <NovaDatePicker
          v-model="emptyDate"
          @open="handleOpen"
          @close="handleClose"
          @change="handleChange"
          :disabledDate="disabledDateAfter"
          :disabledMonthPrev="disabledMonthPrev"
          :disabledMonthNext="disabledMonthNext"
          :locale="customEnglish"
          :month-size="2"
        ></NovaDatePicker>
      </NovaLocale>
      <NovaLocale :locale="zhCN">
        <NovaDatePicker
          v-model="emptyDate"
          @open="handleOpen"
          @close="handleClose"
          @change="handleChange"
          :disabledDate="disabledDateAfter"
          :locale="customChinese"
          :month-size="2"
        ></NovaDatePicker>
      </NovaLocale>
    </div>
    <div class="block"></div>
    <div class="box">
      <button @click="triggerFocus">Focus</button>
      <button @click="triggerBlur">Blur</button>
      <button @click="triggerOpen">Open</button>
      <button @click="triggerClose">Close</button>
    </div>
    <div class="box">
      <NovaDatePicker v-model="someDate" :show-suffix="true"></NovaDatePicker>
      <NovaDatePicker
        v-model="someDate"
        :show-suffix="true"
        :disabled="true"
      ></NovaDatePicker>
      <button @click="handleSelectToday">今天</button>
    </div>
    <div class="box">
      <NovaLocale :locale="en" :holiday="hideHoliday">
        <NovaDatePicker
          v-model="emptyDateRange"
          type="range"
          :show-suffix="true"
          @focus="handleRangeFocus"
          @startFocus="handleStartFocus"
          @endFocus="handleEndFocus"
          @startClick="handleStartClick"
          @endClick="handleEndClick"
          start-placeholder="请选择开始日期"
          end-placeholder="请选择结束日期"
          ref="my-range-date-picker"
        ></NovaDatePicker>
      </NovaLocale>
      <NovaDatePicker
        class="has-prefix"
        v-model="emptyDateRange"
        type="range"
        :disabled="true"
        placeholder="提示"
        show-prefix
      >
        <div slot="prefix" slot-scope="scope">
          <template v-if="scope.range === 'start'">
            开始
          </template>
          <template v-if="scope.range === 'end'">
            结束
          </template>
        </div>
      </NovaDatePicker>

      <NovaDatePicker
        v-model="emptyDateRange"
        type="range"
        :start-fake-disabled="true"
        start-placeholder="YYYY-MM-DD"
        :custom-tooltip="customTooltip"
        show-suffix
      ></NovaDatePicker>
      <NovaDatePicker
        v-model="emptyDateRange"
        type="range"
        :end-fake-disabled="true"
        end-placeholder=""
        :show-tooltip="false"
        show-suffix
      ></NovaDatePicker>
      <NovaDatePicker
        v-model="someDateRange"
        :show-suffix="true"
        type="range"
        @open="handleOpen"
        @close="handleClose"
        @change="handleRangeChange"
        @startChange="handleStartChange"
        @endChange="handleEndChange"
        :disabled-date="disabledRange"
        :locale="customChinese"
      ></NovaDatePicker>
      <NovaDatePicker
        v-model="someDateRange"
        :show-suffix="true"
        type="range"
        @open="handleOpen"
        @close="handleClose"
        @change="handleRangeChange"
        @startChange="handleStartChange"
        @endChange="handleEndChange"
        :disabled="[false, true]"
        :disabled-date="disabledRange"
        :locale="customChinese"
        start-placeholder="START"
        end-placeholder="END"
      ></NovaDatePicker>
      <NovaDatePicker
        v-model="someDateRange"
        :show-suffix="true"
        type="range"
        @open="handleOpen"
        @close="handleClose"
        @change="handleRangeChange"
        @startChange="handleStartChange"
        @endChange="handleEndChange"
        :disabled="[true, false]"
        :disabled-date="disabledRange"
        :locale="customChinese"
        start-placeholder="START"
        end-placeholder="END"
      ></NovaDatePicker>
    </div>
    <div class="box">
      <button @click="triggerFocusStart">Focus Start</button>
      <button @click="triggerBlurStart">Blur Start</button>
      <button @click="triggerFocusEnd">Focus End</button>
      <button @click="triggerBlurEnd">Blur End</button>
      <button @click="triggerOpenStart">Open Start</button>
      <button @click="triggerOpenEnd">Open End</button>
      <button @click="triggerRangeClose">Close</button>
    </div>
  </div>
</template>

<script>
import NovaDatePicker from '../../components/date-picker/NovaDatePicker';
import NovaLocale from '@/components/locale/NovaLocale';
import zhCN from '@/locales/lang/zh-CN';
import en from '@/locales/lang/en';
import dayjs from 'dayjs';

export default {
  name: 'DatePickerDemo',
  components: { NovaLocale, NovaDatePicker },
  data() {
    let someDate = dayjs()
      .startOf('day')
      .toDate();
    let anotherDate = dayjs()
      .add(1, 'month')
      .toDate();

    return {
      en: en,
      zhCN: zhCN,
      customEnglish: {
        datePicker: {}
      },
      customChinese: {
        datePicker: {
          weeksLong: {
            sun: '周日',
            mon: '周一',
            tue: '周二',
            wed: '周三',
            thu: '周四',
            fri: '周五',
            sat: '周六'
          }
        }
      },
      hideHoliday: {},
      emptyDate: null,
      someDate: someDate,
      emptyDateRange: [null, null],
      someDateRange: [someDate, anotherDate]
    };
  },
  methods: {
    handleClick(e) {
      console.log('Click', e);
    },
    handleInputFocus(e) {
      console.log('Input Focus', e);
    },
    handleRangeFocus(e) {
      console.log('Range Focus', e);
    },
    handleStartFocus(e) {
      console.log('Start Focus', e);
    },
    handleEndFocus(e) {
      console.log('End Focus', e);
    },
    handleStartClick(e) {
      console.log('Start Click', e);
    },
    handleEndClick(e) {
      console.log('End Click', e);
    },
    handleOpen() {
      console.log('DatePicker Dropdown OPEN');
    },
    handleClose() {
      console.log('DatePicker Dropdown CLOSE');
    },
    handleChange(value) {
      console.log(value);
    },
    handleRangeChange(range) {
      console.log(range[0], range[1]);
      let start = dayjs(range[0]);
      let end = dayjs(range[1]);
      if (start.isSame(end, 'day')) {
        end.add(1, 'day');
      }
      this.someDateRange[1] = end.toDate();
    },
    handleStartChange(value) {
      console.log('start', value);
    },
    handleEndChange(value) {
      console.log('end', value);
    },
    disabledDateBefore(current) {
      // Can not select days before today and today
      let today = dayjs()
        .startOf('day')
        .toDate();
      return current && current < today;
    },
    disabledDateAfter(current) {
      // Can not select days after today
      let today = dayjs()
        .endOf('day')
        .toDate();
      return current > today;
    },
    disabledRange(current, index) {
      // Start
      if (index === 0) {
        let today = dayjs()
          .startOf('day')
          .toDate();
        return current < today;
      }
      // End
      if (index === 1) {
        let start = this.someDateRange[0];
        return current <= start;
      }
    },
    customTooltip(date) {
      // console.log(date);
      let today = dayjs().startOf('day');
      let dateMoment = dayjs(date);
      return dateMoment.diff(today, 'day');
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
    handleSelectToday() {
      this.someDate = new Date();
    },
    triggerFocus() {
      let $myDatePicker = this.$refs['my-date-picker'];

      setTimeout(() => {
        $myDatePicker.focus();
      }, 1);
    },
    triggerBlur() {
      let $myDatePicker = this.$refs['my-date-picker'];

      setTimeout(() => {
        this.triggerFocus();
      }, 1);

      setTimeout(() => {
        $myDatePicker.blur();
      }, 1000);
    },
    triggerOpen() {
      let $myDatePicker = this.$refs['my-date-picker'];
      setTimeout(() => {
        $myDatePicker.open();
      }, 1);
    },
    triggerClose() {
      let $myDatePicker = this.$refs['my-date-picker'];

      setTimeout(() => {
        this.triggerOpen();
      }, 1);

      setTimeout(() => {
        $myDatePicker.close();
      }, 1000);
    },
    triggerFocusStart() {
      let $myDatePicker = this.$refs['my-range-date-picker'];

      setTimeout(() => {
        $myDatePicker.focusStart();
      }, 1);
    },
    triggerBlurStart() {
      let $myDatePicker = this.$refs['my-range-date-picker'];

      setTimeout(() => {
        this.triggerFocusStart();
      }, 1);

      setTimeout(() => {
        $myDatePicker.blurStart();
      }, 1000);
    },
    triggerFocusEnd() {
      let $myDatePicker = this.$refs['my-range-date-picker'];

      setTimeout(() => {
        $myDatePicker.focusEnd();
      }, 1);
    },
    triggerBlurEnd() {
      let $myDatePicker = this.$refs['my-range-date-picker'];

      setTimeout(() => {
        this.triggerFocusEnd();
      }, 1);

      setTimeout(() => {
        $myDatePicker.blurEnd();
      }, 1000);
    },
    triggerOpenStart() {
      let $myDatePicker = this.$refs['my-range-date-picker'];
      setTimeout(() => {
        $myDatePicker.openStart();
      }, 1);
    },
    triggerOpenEnd() {
      let $myDatePicker = this.$refs['my-range-date-picker'];

      setTimeout(() => {
        $myDatePicker.openEnd();
      }, 1);
    },
    triggerRangeClose() {
      let $myDatePicker = this.$refs['my-range-date-picker'];

      setTimeout(() => {
        $myDatePicker.openStart();
      }, 1);
      setTimeout(() => {
        $myDatePicker.openEnd();
      }, 500);

      setTimeout(() => {
        $myDatePicker.close();
      }, 1000);

      setTimeout(() => {
        $myDatePicker.openEnd();
      }, 1500);
      setTimeout(() => {
        $myDatePicker.openStart();
      }, 2000);

      setTimeout(() => {
        $myDatePicker.close();
      }, 2500);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/ .nova-date-picker {
  margin-right: 20px;
  margin-bottom: 20px;

  .nova-date-picker-toggle {
    .nova-date-picker-inner {
      margin-bottom: 20px;
    }
  }
}

.has-prefix /deep/ .nova-date-picker-input {
  padding-left: 40px;
}
</style>
