let zhCN = {
  select: {
    placeholder: '请选择...'
  },
  datePicker: {
    /**
     * @param year
     * @param month 0-11
     * @returns {string}
     */
    yearAndMonth: (year, month) => {
      return `${year}${zhCN.datePicker.year} ${zhCN.datePicker.months[month]}`;
    },
    today: '今天',
    prevMonth: '上一月',
    nextMonth: '下一月',
    year: '年',
    night: '晚',
    weeksShort: {
      sun: '日',
      mon: '一',
      tue: '二',
      wed: '三',
      thu: '四',
      fri: '五',
      sat: '六'
    },
    weeksLong: {
      sun: '星期日',
      mon: '星期一',
      tue: '星期二',
      wed: '星期三',
      thu: '星期四',
      fri: '星期五',
      sat: '星期六'
    },
    months: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ]
  },
  autocomplete: {
    noData: '未找到匹配数据'
  }
};

export default zhCN;
