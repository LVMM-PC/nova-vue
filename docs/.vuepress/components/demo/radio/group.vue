<template>
  <NovaRadioGroup v-model="value">
    <NovaRadio value="apple">Apple</NovaRadio>
    <NovaRadio value="peach">Peach</NovaRadio>
    <NovaRadio value="orange">Orange</NovaRadio>
    <NovaRadio value="cherry">Cherry</NovaRadio>
  </NovaRadioGroup>
</template>

<script>
export default {
  data() {
    return {
      value: 'apple'
    };
  }
};
</script>
