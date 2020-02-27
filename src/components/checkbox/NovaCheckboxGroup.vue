<template>
  <div
    ref="checkbox-group"
    class="nova-ui-checkbox-group"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'NovaCheckboxGroup',
  provide() {
    return {
      NovaCheckboxGroup: this
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
    setCheck(value, state) {
      let newValue = this.value;

      if (state) {
        let found = this.value.find(item => {
          return item === value;
        });
        if (found) {
          return;
        }

        newValue = this.value.concat([value]);
      } else {
        newValue = this.value.filter(item => {
          return item !== value;
        });
      }

      this.$emit('update', newValue);
      this.$emit('change', newValue);
    }
  }
};
</script>
