<template>
  <section>
    <NovaDatePicker v-model="date"></NovaDatePicker>
    <NovaAlert type="info" border>First Component</NovaAlert>
  </section>
</template>

<script>
export default {
  data() {
    return {
      date: null
    };
  }
};
</script>
