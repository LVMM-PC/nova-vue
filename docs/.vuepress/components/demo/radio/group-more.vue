<template>
  <NovaRadioGroup v-model="value" class="group-more">
    <NovaRadio value="apple">Apple</NovaRadio>
    <NovaRadio value="peach">Peach</NovaRadio>
    <NovaRadio value="orange">Orange</NovaRadio>
    <NovaRadio value="more"
      >More... <input v-if="value === 'more'" class="more-input" type="text"
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

<style lang="less" scoped>
.group-more {
  .nova-radio {
    display: block;
  }
}

.more-input {
  width: 100px;
  height: 20px;
}
</style>
