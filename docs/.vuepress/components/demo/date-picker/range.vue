<template>
  <NovaDatePicker v-model="date" type="range" @change="onChange" />
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      date: [null, null]
    };
  },
  methods: {
    onChange(dates, rangeName) {
      const startDate = dates[0];
      const endDate = dates[1];

      const startDateFormatted = dayjs(startDate).format('YYYY-MM-DD');
      const endDateFormatted = dayjs(endDate).format('YYYY-MM-DD');
      console.log([startDateFormatted, endDateFormatted], rangeName);
    }
  }
};
</script>
