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
    value: {
      type: [Number, Boolean, String],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    setChecked(value, trigger) {
      if (value === this.value) {
        return;
      }

      this.$emit('update', value);
      if (trigger) {
        this.$emit('change', value);
      }
    },
    getChecked() {
      return this.value;
    }
  }
};
</script>
