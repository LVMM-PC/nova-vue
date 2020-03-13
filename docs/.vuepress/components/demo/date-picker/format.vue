<template>
  <section>
    <NovaDatePicker
      :locale="en"
      format="ddd MMM DD YYYY"
      v-model="date"
    ></NovaDatePicker>
    <NovaDatePicker
      format="YYYY年 M月 D日"
      type="range"
      v-model="dates"
    ></NovaDatePicker>
  </section>
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    let now = dayjs().toDate();
    let start = dayjs().toDate();
    let end = dayjs()
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
