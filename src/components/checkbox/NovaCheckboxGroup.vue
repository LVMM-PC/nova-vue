<template>
  <div
    ref="checkbox-group"
    class="nova-checkbox-group"
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
    setChecked(checkedValue, checked, trigger) {
      let newValue;
      let found = this.value.find(item => {
        return item === checkedValue;
      });

      if (checked) {
        if (found) {
          return;
        }

        newValue = this.value.concat([checkedValue]);
      } else {
        if (!found) {
          return;
        }
        newValue = this.value.filter(item => {
          return item !== checkedValue;
        });
      }

      this.$emit('update', newValue);
      if (trigger) {
        this.$emit('change', newValue);
      }
    }
  }
};
</script>
