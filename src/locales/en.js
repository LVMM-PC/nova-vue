const en = {
  empty: {
    description: 'No data'
  },
  select: {
    placeholder: 'Select'
  },
  datePicker: {
    night: 'Night',
    placeholder: 'Select date',
    rangePlaceholder: ['Start date', 'End date'],
    yearAndMonth: (year, month) => {
      return `${en.datePicker.months[month]} ${year}`;
    },
    today: 'Today',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    year: 'Year',
    weeksShort: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat'
    },
    weeksLong: {
      sun: 'Sunday',
      mon: 'Monday',
      tue: 'Tuesday',
      wed: 'Wednesday',
      thu: 'Thursday',
      fri: 'Friday',
      sat: 'Saturday'
    },
    months: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]
  },
  modal: {
    ok: 'Ok',
    cancel: 'Cancel'
  }
};

export default en;
