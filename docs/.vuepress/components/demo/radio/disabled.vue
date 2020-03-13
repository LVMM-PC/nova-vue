<template>
  <section>
    <NovaRadio :disabled="disabled" v-model="someValue">Disabled</NovaRadio>
    <br />
    <NovaRadio :disabled="disabled" v-model="anotherValue">Disabled</NovaRadio>
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
