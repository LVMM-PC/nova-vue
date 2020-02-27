<template>
  <div
    class="nova-ui-alert-icon"
    :class="[`nova-ui-alert-icon-${type}`]"
    v-bind="$attrs"
    v-on="$listeners"
  ></div>
</template>

<script>
export default {
  name: 'NovaAlertIcon',
  props: {
    type: String
  }
};
</script>

<style scoped>
.nova-ui-alert-icon {
  display: inline-block;
  vertical-align: top;
}

.nova-ui-alert-icon-success,
.nova-ui-alert-icon-warning,
.nova-ui-alert-icon-error,
.nova-ui-alert-icon-info,
.nova-ui-alert-icon-help {
  width: 14px;
  height: 14px;
}

.nova-ui-alert-icon-success {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-success.svg);
}

.nova-ui-alert-icon-warning {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-warning.svg);
}

.nova-ui-alert-icon-error {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-error.svg);
}

.nova-ui-alert-icon-info {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-info.svg);
}

.nova-ui-alert-icon-help {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-help.svg);
}
</style>
