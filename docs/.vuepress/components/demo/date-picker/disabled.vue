<template>
  <section>
    <NovaDatePicker disabled v-model="date"></NovaDatePicker>
    <NovaDatePicker disabled type="range" v-model="dates"></NovaDatePicker>
    <NovaDatePicker
      :disabled="[false, true]"
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
      date: now,
      dates: [start, end]
    };
  }
};
</script>
