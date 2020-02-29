<template>
  <section>
    <NovaLocale :locale="zhCN" :holiday="china">
      <NovaDatePicker v-model="date"></NovaDatePicker>
    </NovaLocale>
    <NovaLocale :locale="en" :holiday="hideHoliday">
      <NovaDatePicker v-model="date"></NovaDatePicker>
    </NovaLocale>
  </section>
</template>

<script>
const en = nova.locale.en; // import en from 'nova-vue/src/locale/lang/en'
const zhCN = nova.locale.zhCN; // import zhCN from 'nova-vue/src/locale/lang/zh-CN'
const china = nova.holiday.china; // import china from 'nova-vue/src/locale/holiday/china'

export default {
  data() {
    return {
      date: null,
      en,
      zhCN,
      china,
      hideHoliday: {}
    };
  }
};
</script>
