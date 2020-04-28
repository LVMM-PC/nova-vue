<template>
  <section>
    <NovaLocale :holiday="hideHoliday" :locale="en">
      <NovaDatePicker
        v-model="date"
        format="ddd MMM DD YYYY"
        placeholder="Select date"
      ></NovaDatePicker>
    </NovaLocale>
    <NovaLocale :holiday="holidayZhCN" :locale="zhCN">
      <NovaDatePicker
        v-model="date"
        format="YYYY年 M月 D日"
        placeholder="选择日期"
      ></NovaDatePicker>
    </NovaLocale>
  </section>
</template>

<script>
import { en, zhCN, holidayZhCN } from 'nova-vue';

export default {
  data() {
    return {
      date: null,
      en,
      zhCN,
      holidayZhCN,
      hideHoliday: {}
    };
  }
};
</script>
