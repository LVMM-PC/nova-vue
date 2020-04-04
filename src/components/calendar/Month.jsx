import Inventory from '../../utils/inventory';
import NovaIconTop from '@/icons/NovaIconTop.jsx';
import NovaIconBottom from '@/icons/NovaIconBottom.jsx';

export default {
  name: 'CalendarMonth',
  inject: ['NovaCalendar'],
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-calendar`
    },
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
    const NovaCalendar = this.NovaCalendar;
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
      const firstMomentOfMonth = this.getShowMoment();
      const dayOfWeek = firstMomentOfMonth.day();
      const firstMomentOfPanel = firstMomentOfMonth.subtract(dayOfWeek, 'day');

      const momentList = new Array(7 * 6).fill(null);
      this.momentList = momentList.map((d, index) => {
        return firstMomentOfPanel.add(index, 'day');
      });
    },
    getCalendarTitle() {
      const showMoment = this.getShowMoment();
      return this.novaLocale.datePicker
        .yearAndMonth(showMoment.year(), showMoment.month())
        .replace(' ', '\n');
    },
    getShowMoment() {
      return this.NovaCalendar.panelMoment.add(this.offset, 'month');
    },
    getMomentClassName(dateMoment) {
      const panelMoment = this.getShowMoment();
      const isDisabled = this.isDisabled(dateMoment);

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
    switchToPrevMonth: function() {
      if (this.isDisabledMonthPrev()) {
        return;
      }

      const panelMoment = this.NovaCalendar.panelMoment.add(-1, 'month');
      this.NovaCalendar.updateShowDate(panelMoment.toDate());
    },
    prevMonthClick() {
      this.switchToPrevMonth();
    },
    switchToNextMonth: function() {
      if (this.isDisabledMonthNext()) {
        return;
      }

      const panelMoment = this.NovaCalendar.panelMoment.add(1, 'month');
      this.NovaCalendar.updateShowDate(panelMoment.toDate());
    },
    nextMonthClick() {
      this.switchToNextMonth();
    },
    nextMonthKeydown(e) {
      switch (e.key) {
        case 'Spacebar': // IE/Edge
        case ' ':
          e.preventDefault();
          this.switchToNextMonth();
          break;
        case 'Enter':
          e.preventDefault();
          this.switchToNextMonth();
          break;
      }
    },
    prevMonthKeydown(e) {
      switch (e.key) {
        case 'Spacebar': // IE/Edge
        case ' ':
          e.preventDefault();
          this.switchToPrevMonth();
          break;
        case 'Enter':
          e.preventDefault();
          this.switchToPrevMonth();
          break;
      }
    },
    isDisabledMonthPrev() {
      return this.NovaCalendar.disabledMonthPrev.call(
        undefined,
        this.getShowMoment().toDate()
      );
    },
    getMonthPrevClass() {
      const isDisabled = this.isDisabledMonthPrev();

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
      const isDisabled = this.isDisabledMonthNext();

      return {
        'is-disabled': isDisabled,
        'is-hidden': this.offset !== this.showMonthSize - 1
      };
    }
  },
  render() {
    const {
      $scopedSlots,
      defaultFormat,
      getCalendarTitle,
      getMomentClassName,
      getMonthNextClass,
      getMonthPrevClass,
      getShowMoment,
      isDisabledMonthNext,
      isDisabledMonthPrev,
      momentList,
      nextMonthClick,
      nextMonthKeydown,
      novaLocale,
      offset,
      prefixedClass,
      prevMonthClick,
      prevMonthKeydown,
      weeks
    } = this;

    const weekList = weeks.map((week, index) => {
      const weekProps = {
        class: [`${prefixedClass}-week`, `${prefixedClass}-${weeks[index]}`],
        key: index
      };

      const weekTitle = novaLocale.datePicker.weeksShort[week];

      return <div {...weekProps}>{weekTitle}</div>;
    });

    const dateList = momentList.map((dateMoment, index) => {
      const dateProps = {
        class: [`${prefixedClass}-date`, getMomentClassName(dateMoment)],
        key: dateMoment.format(defaultFormat)
      };
      const slotProps = {
        date: dateMoment.toDate(),
        index,
        offset,
        panelDate: getShowMoment().toDate()
      };
      const defaultDateCell = (
        <div class={`${prefixedClass}-date-number`}>{dateMoment.date()}</div>
      );
      const dateCellRender = $scopedSlots.dateCellRender
        ? $scopedSlots.dateCellRender(slotProps)
        : defaultDateCell;
      return <div {...dateProps}>{dateCellRender}</div>;
    });

    const prevMonthTitle = novaLocale.datePicker.prevMonth;
    const prevDisabled = isDisabledMonthPrev();
    const prevProps = {
      class: [`${prefixedClass}-prev`, getMonthPrevClass()],
      attrs: {
        tabindex: !prevDisabled ? 0 : -1,
        title: !prevDisabled ? prevMonthTitle : ''
      },
      on: {
        click: prevMonthClick,
        keydown: prevMonthKeydown
      }
    };
    const prevNode = (
      <div {...prevProps}>
        <NovaIconTop />
        {prevMonthTitle}
      </div>
    );

    const titleNode = (
      <div class={`${prefixedClass}-title`}>
        <span class={`${prefixedClass}-title-support`}></span>
        <span class={`${prefixedClass}-title-text`}>{getCalendarTitle()}</span>
      </div>
    );

    const nextMonthTitle = novaLocale.datePicker.nextMonth;
    const nextDisabled = isDisabledMonthNext();
    const nextProps = {
      class: [`${prefixedClass}-next`, getMonthNextClass()],
      attrs: {
        tabindex: !nextDisabled ? 0 : -1,
        title: !nextDisabled ? nextMonthTitle : ''
      },
      on: {
        click: nextMonthClick,
        keydown: nextMonthKeydown
      }
    };
    const nextNode = (
      <div {...nextProps}>
        <NovaIconBottom />
        {nextMonthTitle}
      </div>
    );

    return (
      <div class={`${prefixedClass}-month`}>
        <div class={`${prefixedClass}-header`}>
          <div class={`${prefixedClass}-weeks`}>{weekList}</div>
        </div>
        <div class={`${prefixedClass}-content`}>
          <div class={`${prefixedClass}-dates`}>{dateList}</div>
        </div>
        <div class={`${prefixedClass}-sidebar`}>
          {prevNode}
          {titleNode}
          {nextNode}
        </div>
      </div>
    );
  }
};
