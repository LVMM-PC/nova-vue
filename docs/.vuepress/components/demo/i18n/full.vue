<template>
  <section>
    <NovaLocale :holiday="china" :locale="zhCN">
      <NovaDatePicker placeholder="选择日期" v-model="date"></NovaDatePicker>
    </NovaLocale>
    <NovaLocale :holiday="hideHoliday" :locale="en">
      <NovaDatePicker placeholder="Select date" v-model="date"></NovaDatePicker>
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
