<template>
  <section>
    <NovaCheckbox v-model="someValue" :disabled="disabled"></NovaCheckbox>
    <br />
    <NovaCheckbox v-model="anotherValue" :disabled="disabled"></NovaCheckbox>
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
