<template>
  <NovaDatePicker @change="onChange" v-model="date" />
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
      let dateFormatted = dayjs(date).format('YYYY-MM-DD');
      console.log(dateFormatted);
    }
  }
};
</script>
