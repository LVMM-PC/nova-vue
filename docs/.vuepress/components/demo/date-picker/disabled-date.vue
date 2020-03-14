<template>
  <section>
    <NovaDatePicker
      v-model="date"
      :disabled-date="disabledDate"
    ></NovaDatePicker>
    <NovaDatePicker
      v-model="dates"
      :disabled-date="disabledDateRange"
      type="range"
      @change="handleRangeChange"
    ></NovaDatePicker>
  </section>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      date: null,
      dates: [null, null]
    };
  },
  methods: {
    disabledDate(current) {
      let today = dayjs().startOf('day');
      return current < today;
    },
    disabledDateRange(current, rangeName) {
      let today = dayjs().startOf('day');
      switch (rangeName) {
        case 'start':
          return current < today;
        case 'end':
          let dates = this.dates;
          let startDate = dates[0];
          return (
            current < today ||
            dayjs(startDate || today)
              .add(30, 'day')
              .isBefore(current)
          );
        default:
          return false;
      }
    },
    handleRangeChange(dates, rangeName) {
      let startDate = dates[0];
      let endDate = dates[1];
      if (rangeName === 'start' && startDate && endDate) {
        let limitDate = dayjs(startDate).add(30, 'day');
        let overLimit = limitDate.isBefore(endDate);
        if (overLimit) {
          this.dates[1] = limitDate.toDate();
        }
      }
    }
  }
};
</script>
