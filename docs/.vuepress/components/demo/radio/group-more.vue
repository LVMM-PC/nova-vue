<template>
  <NovaRadioGroup class="group-more" v-model="value">
    <NovaRadio value="apple">Apple</NovaRadio>
    <NovaRadio value="peach">Peach</NovaRadio>
    <NovaRadio value="orange">Orange</NovaRadio>
    <NovaRadio value="more"
      >More... <input class="more-input" type="text" v-if="value === 'more'"
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
