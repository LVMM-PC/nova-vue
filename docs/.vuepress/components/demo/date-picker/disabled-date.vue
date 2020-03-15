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
      @change="onRangeChange"
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
      const today = dayjs().startOf('day');
      return current < today;
    },
    disabledDateRange(current, rangeName) {
      const today = dayjs().startOf('day');
      switch (rangeName) {
        case 'start':
          return current < today;
        case 'end':
          const dates = this.dates;
          const startDate = dates[0];
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
    onRangeChange(dates, rangeName) {
      const startDate = dates[0];
      const endDate = dates[1];
      if (rangeName === 'start' && startDate && endDate) {
        const limitDate = dayjs(startDate).add(30, 'day');
        const overLimit = limitDate.isBefore(endDate);
        if (overLimit) {
          this.dates[1] = limitDate.toDate();
        }
      }
    }
  }
};
</script>
