<template>
  <NovaDatePicker v-model="date" @change="onChange" type="range" />
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
      let startDate = dates[0];
      let endDate = dates[1];

      let startDateFormatted = dayjs(startDate).format('YYYY-MM-DD');
      let endDateFormatted = dayjs(endDate).format('YYYY-MM-DD');
      console.log([startDateFormatted, endDateFormatted], rangeName);
    }
  }
};
</script>
