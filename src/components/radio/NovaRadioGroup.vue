<template>
  <div
    ref="radio-group"
    class="nova-ui-radio-group"
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
