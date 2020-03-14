<template>
  <NovaDatePicker v-model="date" @change="onChange" />
</template>

<script>
import dayjs from 'dayjs';

export default {
  data() {
    return {
      date: null
    };
  },
  methods: {
    onChange(date) {
      const dateFormatted = dayjs(date).format('YYYY-MM-DD');
      console.log(dateFormatted);
    }
  }
};
</script>
