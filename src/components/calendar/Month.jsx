export default {
  name: 'Month',
  inject: ['NovaCalendar'],
  props: {
    offset: {
      type: Number,
      default: 0
    },
    novaLocale: {
      type: Object,
      default: null
    }
  },
  data() {
    let NovaCalendar = this.NovaCalendar;
    return {
      weeks: NovaCalendar.weeks,
      defaultFormat: NovaCalendar.defaultFormat,
      showMonthSize: NovaCalendar.showMonthSize,
      momentList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.refreshDateList();
    },
    refreshDateList() {
      let firstMomentOfMonth = this.getShowMoment();
      let dayOfWeek = firstMomentOfMonth.day();
      let firstMomentOfPanel = firstMomentOfMonth.subtract(dayOfWeek, 'days');

      let momentList = new Array(7 * 6).fill(null);
      this.momentList = momentList.map((d, index) => {
        return firstMomentOfPanel.add(index, 'days');
      });
    },
    getCalendarTitle() {
      let showMoment = this.getShowMoment();
      return this.novaLocale.datePicker
        .yearAndMonth(showMoment.year(), showMoment.month())
        .replace(' ', '\n');
    },
    getShowMoment() {
      return this.NovaCalendar.panelMoment.add(this.offset, 'month');
    },
    getMomentClassName(dateMoment) {
      let panelMoment = this.getShowMoment();
      let isDisabled = this.isDisabled(dateMoment);

      let isPrev = false;
      let isNext = false;
      if (dateMoment) {
        isPrev = panelMoment.isAfter(dateMoment, 'month');
        isNext = panelMoment.isBefore(dateMoment, 'month');
      }

      return {
        'is-disabled': isDisabled,
        'is-prev': isPrev,
        'is-next': isNext
      };
    },
    isDisabled(dateMoment) {
      return this.NovaCalendar.disabledDate.call(
        undefined,
        dateMoment.toDate()
      );
    },
    prevMonthClick() {
      if (this.isDisabledMonthPrev()) {
        return;
      }

      let panelMoment = this.NovaCalendar.panelMoment.add(-1, 'month');
      this.NovaCalendar.updateShowDate(panelMoment.toDate());
    },
    nextMonthClick() {
      if (this.isDisabledMonthNext()) {
        return;
      }

      let panelMoment = this.NovaCalendar.panelMoment.add(1, 'month');
      this.NovaCalendar.updateShowDate(panelMoment.toDate());
    },
    isDisabledMonthPrev() {
      return this.NovaCalendar.disabledMonthPrev.call(
        undefined,
        this.getShowMoment().toDate()
      );
    },
    getMonthPrevClass() {
      let isDisabled = this.isDisabledMonthPrev();

      return {
        'is-disabled': isDisabled,
        'is-hidden': this.offset !== 0
      };
    },
    isDisabledMonthNext() {
      return this.NovaCalendar.disabledMonthNext.call(
        undefined,
        this.getShowMoment().toDate()
      );
    },
    getMonthNextClass() {
      let isDisabled = this.isDisabledMonthNext();

      return {
        'is-disabled': isDisabled,
        'is-hidden': this.offset !== this.showMonthSize - 1
      };
    }
  },
  render() {
    let {
      weeks,
      novaLocale,
      momentList,
      defaultFormat,
      getMomentClassName,
      $scopedSlots,
      offset,
      getShowMoment,
      isDisabledMonthPrev,
      getMonthPrevClass,
      prevMonthClick,
      isDisabledMonthNext,
      getMonthNextClass,
      nextMonthClick,
      getCalendarTitle
    } = this;

    const weekList = weeks.map((week, index) => {
      const weekProps = {
        class: [`nova-calendar-week`, `nova-calendar-${weeks[index]}`],
        key: index
      };

      const weekTitle = novaLocale.datePicker.weeksShort[week];

      return <div {...weekProps}>{weekTitle}</div>;
    });

    const dateList = momentList.map((dateMoment, index) => {
      const dateProps = {
        class: [`nova-calendar-date`, getMomentClassName(dateMoment)],
        key: dateMoment.format(defaultFormat)
      };
      const slotProps = {
        date: dateMoment.toDate(),
        index,
        offset,
        panelDate: getShowMoment().toDate()
      };
      const defaultDateCell = (
        <div class="nova-calendar-date-number">{dateMoment.date()}</div>
      );
      const dateCellRender = $scopedSlots.dateCellRender
        ? $scopedSlots.dateCellRender(slotProps)
        : defaultDateCell;
      return <div {...dateProps}>{dateCellRender}</div>;
    });

    const prevMonthTitle = novaLocale.datePicker.prevMonth;
    const prevProps = {
      class: [`nova-calendar-prev`, getMonthPrevClass()],
      attrs: {
        title: !isDisabledMonthPrev() ? prevMonthTitle : ''
      },
      on: {
        click: prevMonthClick
      }
    };
    const prevNode = <div {...prevProps}>{prevMonthTitle}</div>;

    const titleNode = (
      <div class="nova-calendar-title">
        <span class="nova-calendar-title-support"></span>
        <span class="nova-calendar-title-text">{getCalendarTitle()}</span>
      </div>
    );

    const nextMonthTitle = novaLocale.datePicker.nextMonth;
    const nextProps = {
      class: [`nova-calendar-next`, getMonthNextClass()],
      attrs: {
        title: !isDisabledMonthNext() ? nextMonthTitle : ''
      },
      on: {
        click: nextMonthClick
      }
    };
    const nextNode = <div {...nextProps}>{nextMonthTitle}</div>;

    return (
      <div class="nova-calendar-month">
        <div class="nova-calendar-header">
          <div class="nova-calendar-weeks">{weekList}</div>
        </div>
        <div class="nova-calendar-content">
          <div class="nova-calendar-dates">{dateList}</div>
        </div>
        <div class="nova-calendar-sidebar">
          {prevNode}
          {titleNode}
          {nextNode}
        </div>
      </div>
    );
  }
};
