<template>
  <section>
    <NovaDatePicker v-model="date"></NovaDatePicker>
    <NovaAlert border type="info">First Component</NovaAlert>
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
