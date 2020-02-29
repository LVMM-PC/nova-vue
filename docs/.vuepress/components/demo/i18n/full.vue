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
const en = nova.locale.en;
const zhCN = nova.locale.zhCN;
const china = nova.holiday.china;

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
