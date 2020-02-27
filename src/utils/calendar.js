import moment from 'moment';

export default class Calendar {
  static weeks = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  static defaultFormat = 'YYYY-MM-DD';

  static getFirstDateMomentOfMonth(date) {
    return moment(date).startOf('month');
  }
}
