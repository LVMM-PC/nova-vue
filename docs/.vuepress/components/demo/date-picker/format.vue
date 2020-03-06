<template>
  <section>
    <NovaDatePicker
      v-model="date"
      format="ddd MMM DD YYYY"
      :locale="en"
    ></NovaDatePicker>
    <NovaDatePicker
      v-model="dates"
      type="range"
      format="YYYY年 M月 D日"
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
