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

<style lang="less">
@import '../../styles/var';

@alert: @{prefixed}-alert;

.@{alert}-icon {
  display: inline-block;
  vertical-align: top;
}

.@{alert}-icon-success,
.@{alert}-icon-warning,
.@{alert}-icon-error,
.@{alert}-icon-info,
.@{alert}-icon-help {
  width: 14px;
  height: 14px;
}

.@{alert}-icon-success {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-success.svg);
}

.@{alert}-icon-warning {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-warning.svg);
}

.@{alert}-icon-error {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-error.svg);
}

.@{alert}-icon-info {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-info.svg);
}

.@{alert}-icon-help {
  background-size: 14px;
  background-image: url(../../assets/icons/icon-help.svg);
}
</style>
