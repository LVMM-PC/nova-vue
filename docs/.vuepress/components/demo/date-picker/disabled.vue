<template>
  <section>
    <NovaDatePicker v-model="date" disabled></NovaDatePicker>
    <NovaDatePicker v-model="dates" type="range" disabled></NovaDatePicker>
    <NovaDatePicker
      v-model="dates"
      type="range"
      :disabled="[false, true]"
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
      date: now,
      dates: [start, end]
    };
  }
};
</script>
