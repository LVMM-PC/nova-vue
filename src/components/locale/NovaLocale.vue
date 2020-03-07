<template>
  <div
    class="nova-locale"
    :class="{ 'nova-locale-block': block }"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </div>
</template>

<script>
import zhCN from '@/locales/lang/zh-CN';
import holiday from '@/locales/holiday/china';

export default {
  name: 'NovaLocale',
  provide() {
    return {
      NovaLocale: this
    };
  },
  props: {
    block: {
      type: Boolean,
      default: true
    },
    holiday: {
      type: Object,
      default: () => {
        return holiday;
      }
    },
    locale: {
      type: Object,
      default: () => {
        return zhCN;
      }
    }
  }
};
</script>

<style lang="less">
@import '../../styles/var';

.@{prefixed}-locale {
  &:not(.@{prefixed}-locale-block) {
    vertical-align: top;
    display: inline-block;
  }
}
</style>
