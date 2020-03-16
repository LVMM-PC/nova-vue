<template>
  <section>
    <NovaLocale :holiday="hideHoliday" :locale="en">
      <NovaDatePicker v-model="date" placeholder="Select date"></NovaDatePicker>
    </NovaLocale>
    <NovaLocale :holiday="china" :locale="zhCN">
      <NovaDatePicker v-model="date" placeholder="选择日期"></NovaDatePicker>
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
