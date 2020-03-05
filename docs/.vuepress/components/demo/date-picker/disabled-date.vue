<template>
  <section>
    <NovaDatePicker
      v-model="date"
      :disabled-date="disabledDate"
    ></NovaDatePicker>
    <NovaDatePicker
      v-model="dates"
      type="range"
      :disabled-date="disabledDate"
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
      return current && current < dayjs().endOf('day');
    }
  }
};
</script>
