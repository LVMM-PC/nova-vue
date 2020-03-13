<template>
  <div class="nova-select-option-group" v-bind="$attrs" v-on="$listeners">
    <div
      v-if="NovaSelect.dropdownLoaded"
      class="nova-select-option-group-label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div class="nova-select-option-group-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NovaOptGroup',
  inject: ['NovaSelect'],
  props: {
    label: {
      type: String,
      default: ''
    }
  }
};
</script>
