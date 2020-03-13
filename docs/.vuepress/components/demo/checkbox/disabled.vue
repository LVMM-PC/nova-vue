<template>
  <section>
    <NovaCheckbox :disabled="disabled" v-model="someValue"></NovaCheckbox>
    <br />
    <NovaCheckbox :disabled="disabled" v-model="anotherValue"></NovaCheckbox>
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
