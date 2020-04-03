<template>
  <section>
    <NovaCheckbox v-model="someValue" :disabled="disabled">Disabled</NovaCheckbox>
    <br />
    <NovaCheckbox v-model="anotherValue" :disabled="disabled">Disabled</NovaCheckbox>
    <br />
    <NovaButton @click="toggleDisabled">Toggle Disabled</NovaButton>
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
