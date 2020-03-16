const zhTW = {
  select: {
    placeholder: '請選擇'
  },
  datePicker: {
    night: '晚',
    placeholder: '請選擇日期',
    rangePlaceholder: ['開始日期', '結束日期'],
    yearAndMonth: (year, month) => {
      return `${year}${zhTW.datePicker.year} ${zhTW.datePicker.months[month]}`;
    },
    today: '今天',
    prevMonth: '上個月',
    nextMonth: '下個月',
    year: '年',
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
  autoComplete: {
    noData: '未找到匹配數據'
  }
};

export default zhTW;
