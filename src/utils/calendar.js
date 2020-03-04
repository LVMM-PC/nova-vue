import dayjs from 'dayjs';

export default class Calendar {
  static weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  static defaultFormat = 'YYYY-MM-DD';

  static getFirstDateMomentOfMonth(date) {
    return dayjs(date).startOf('month');
  }
}
