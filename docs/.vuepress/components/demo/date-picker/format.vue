<template>
  <section>
    <NovaDatePicker
      v-model="date"
      :locale="en"
      :holiday="hideHoliday"
      format="ddd MMM DD YYYY"
    ></NovaDatePicker>
    <NovaDatePicker
      v-model="dates"
      format="YYYY年 M月 D日"
      type="range"
    ></NovaDatePicker>
  </section>
</template>

<script>
import { en } from 'nova-vue';
import dayjs from 'dayjs';

export default {
  data() {
    const now = dayjs().toDate();
    const start = dayjs().toDate();
    const end = dayjs()
      .add(1, 'month')
      .toDate();
    return {
      en,
      hideHoliday: {},
      date: now,
      dates: [start, end]
    };
  }
};
</script>
