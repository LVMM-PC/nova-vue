<template>
  <section>
    <NovaRadio v-model="someValue" :disabled="disabled">Disabled</NovaRadio>
    <br />
    <NovaRadio v-model="anotherValue" :disabled="disabled">Disabled</NovaRadio>
    <br />
    <button @click="toggleDisabled">Toggle Disabled</button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      someValue: false,
      anotherValue: true,
      disabled: true
    };
  },
  methods: {
    toggleDisabled() {
      this.disabled = !this.disabled;
    }
  }
};
</script>
