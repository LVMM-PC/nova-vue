<template>
  <NovaRadioGroup v-model="value" class="group-more">
    <NovaRadio value="apple">Apple</NovaRadio>
    <NovaRadio value="peach">Peach</NovaRadio>
    <NovaRadio value="orange">Orange</NovaRadio>
    <NovaRadio value="more"
      >More... <input v-show="value === 'more'" class="more-input" type="text"
    /></NovaRadio>
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

<style scoped>
.group-more .nova-radio {
  display: block;
}

.more-input {
  width: 100px;
  height: 20px;
}
</style>
