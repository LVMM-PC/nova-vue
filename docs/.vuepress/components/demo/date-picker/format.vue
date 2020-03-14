<template>
  <section>
    <NovaDatePicker
      v-model="date"
      :locale="en"
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
import dayjs from 'dayjs';

export default {
  data() {
    const now = dayjs().toDate();
    const start = dayjs().toDate();
    const end = dayjs()
      .add(1, 'month')
      .toDate();
    return {
      en: nova.locale.en,
      date: now,
      dates: [start, end]
    };
  }
};
</script>
