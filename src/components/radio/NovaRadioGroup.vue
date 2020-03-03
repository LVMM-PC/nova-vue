<template>
  <div
    ref="radio-group"
    class="nova-radio-group"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NovaRadioGroup',
  provide() {
    return {
      NovaRadioGroup: this
    };
  },
  model: {
    event: 'update'
  },
  props: {
    value: {},
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setValue(value) {
      this.$emit('update', value);
      this.$emit('change', value);
    }
  }
};
</script>

<style lang="less">
@import '../../styles/var';

@radio: @{prefixed}-radio;

.@{radio}-group {
  display: inline-block;
  line-height: 20px;

  .@{radio} {
    margin-right: 10px;
  }
}
</style>
