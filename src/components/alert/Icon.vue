<template>
  <div
    class="nova-alert-icon"
    :class="[`nova-alert-icon-${type}`]"
    v-bind="$attrs"
    v-on="$listeners"
  ></div>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    type: String
  }
};
</script>
