<template>
  <NovaRadioGroup v-model="value" class="group-more">
    <NovaRadio value="apple">Apple</NovaRadio>
    <NovaRadio value="peach">Peach</NovaRadio>
    <NovaRadio value="orange">Orange</NovaRadio>
    <NovaRadio value="more"
      >More... <input v-if="value === 'more'" type="text" class="more-input"
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
  .nova-ui-radio {
    display: block;
    line-height: 30px;

    /deep/ .nova-ui-radio-input {
      margin-top: 8px;
    }
  }
}

.more-input {
  width: 100px;
}
</style>
