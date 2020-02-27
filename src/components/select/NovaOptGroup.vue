<template>
  <div class="nova-ui-select-option-group" v-bind="$attrs" v-on="$listeners">
    <div class="nova-ui-select-option-group-label">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div class="nova-ui-select-option-group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NovaOptGroup',
  props: {
    label: {
      type: String
    }
  }
};
</script>

<style lang="less" scoped>
.nova-ui-select-option-group {
}

.nova-ui-select-option-group-label {
  opacity: 0.5;
  padding: 5px 10px;
}

.nova-ui-select-option-group-content {
  /deep/ .nova-ui-select-option {
    padding-left: 20px;
  }
}
</style>
