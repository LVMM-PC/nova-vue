<template>
  <section>
    <NovaLocale :holiday="hideHoliday" :locale="en">
      <NovaDatePicker
        v-model="date"
        placeholder="Select date"
        format="ddd MMM DD YYYY"
      ></NovaDatePicker>
    </NovaLocale>
    <NovaLocale :holiday="china" :locale="zhCN">
      <NovaDatePicker
        v-model="date"
        placeholder="选择日期"
        format="YYYY年 M月 D日"
      ></NovaDatePicker>
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
