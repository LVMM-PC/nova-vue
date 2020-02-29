<template>
  <div class="nova-ui-locale" v-bind="$attrs" v-on="$listeners">
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

<style lang="less" scoped>
.nova-ui-locale {
  vertical-align: top;
  display: inline-block;
}
</style>
