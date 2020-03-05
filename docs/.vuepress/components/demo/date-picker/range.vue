<template>
  <NovaDatePicker v-model="date" @change="onChange" type="range" />
</template>

<script>
export default {
  data() {
    return {
      date: [null, null]
    };
  },
  methods: {
    onChange(date) {
      console.log(date);
    }
  }
};
</script>
