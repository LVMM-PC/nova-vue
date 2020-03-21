import dayjs from 'dayjs';
import Storage from '@/utils/storage';
import Calendar from '@/utils/calendar';
import NovaIconLeft from '@/icons/NovaIconLeft';
import NovaIconRight from '@/icons/NovaIconRight';

export default {
  name: 'Month',
  inject: ['NovaDatePicker'],
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-date-picker`
    },
    offset: {
      type: Number,
      default: 0
    },
    novaLocale: {
      type: Object,
      default: null
    },
    novaHoliday: {
      type: Object,
      default: null
    }
  },
  data() {
    const NovaDatePicker = this.NovaDatePicker;
    return {
      momentList: [],
      showMonthSize: NovaDatePicker.showMonthSize,
      weeks: NovaDatePicker.weeks,
      isRange: NovaDatePicker.isRange,
      defaultFormat: Calendar.defaultFormat
    };
  },
  computed: {
    rangeIndex() {
      return this.NovaDatePicker.rangeIndex;
    },
    rangeName() {
      return this.NovaDatePicker.rangeName;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.refreshDateList();
    },
    handleMomentSelect(dateMoment) {
      if (this.isDisabled(dateMoment)) {
        return;
      }
      if (this.NovaDatePicker.isRange) {
        this.NovaDatePicker.handleRangeSelect(dateMoment);
      } else {
        this.NovaDatePicker.handleMomentSelect(dateMoment);
      }
    },
    handleDateMouseEnter(date, e) {
      if (this.isDisabled(date)) {
        return;
      }

      if (!(this.isRange && this.rangeIndex === 1)) {
        return;
      }

      const selectedMoment = this.NovaDatePicker.valueMoment;
      if (selectedMoment[0]) {
        const diff = date.diff(selectedMoment[0], 'day');

        this.NovaDatePicker.updateHoverDate(date.toDate());
        const night = this.novaLocale.datePicker.night;
        let tooltipText = diff + ' ' + night;

        if (this.NovaDatePicker.customTooltip) {
          tooltipText = this.NovaDatePicker.customTooltip.call(
            undefined,
            dayjs(date).startOf('day')
          );
        }

        this.NovaDatePicker.openTooltip(e.target, tooltipText);
      }
    },
    handleDateMouseLeave() {
      this.NovaDatePicker.updateHoverDate(null);
      this.NovaDatePicker.closeTooltip();
      this.NovaDatePicker.openDefaultTooltip();
    },
    refreshDateList() {
      const firstMomentOfMonth = this.getShowMoment();

      const dayOfWeek = firstMomentOfMonth.day();
      const firstMomentOfPanel = firstMomentOfMonth.subtract(dayOfWeek, 'day');

      const momentList = new Array(7 * 6).fill(null);
      this.momentList = momentList.map((d, index) => {
        return firstMomentOfPanel.add(index, 'day');
      });

      this.openDefaultTooltip(true);
    },
    openDefaultTooltip(first) {
      this.momentList.forEach((dateMoment, index) => {
        if (this.isRange) {
          const selectedMoment = this.NovaDatePicker.valueMoment;

          if (this.rangeIndex === 1) {
            const startDate = selectedMoment[0];
            const endDate = selectedMoment[1];

            const isEndDate = dateMoment.isSame(endDate, 'day');
            if (startDate && endDate && isEndDate) {
              const isSameMonth = this.getShowMoment().isSame(endDate, 'month');

              if (!isSameMonth) {
                return;
              }

              const diff = endDate.diff(startDate, 'day');
              const night = this.novaLocale.datePicker.night;
              let tooltip = diff + ' ' + night;
              if (this.NovaDatePicker.customTooltip) {
                tooltip = this.NovaDatePicker.customTooltip.call(
                  undefined,
                  dateMoment.toDate()
                );
              }
              this.showDefaultTooltip(first, index, tooltip);
            }
          }
        }
      });
    },
    showDefaultTooltip(first, index, text) {
      let { prefixedClass } = this;

      function run() {
        const $dates = this.$refs['dates'];
        const $endDate = $dates.querySelectorAll(`.${prefixedClass}-date`)[
          index
        ];

        this.NovaDatePicker.defaultEndTooltip = $endDate;
        if ($endDate) {
          this.NovaDatePicker.openTooltip($endDate, text);
        }
      }

      if (first) {
        setTimeout(() => {
          this.$nextTick(() => {
            run.call(this);
          });
        }, 50);
      } else {
        run.call(this);
      }
    },
    getShowMoment() {
      return this.NovaDatePicker.panelMoment.add(this.offset, 'month');
    },
    getMomentClassName(dateMoment) {
      const panelMoment = this.getShowMoment();
      const selectedMoment = this.NovaDatePicker.valueMoment;

      const isDisabled = this.isDisabled(dateMoment);
      let isSelected = false;
      let isInRange = false;
      let isRangeHoverStart = false;
      let isRangeHoverEnd = false;
      let isRangeHover = false;
      let isPrev = false;
      let isNext = false;
      let isRangeStart = false;
      let isRangeEnd = false;
      let isRangeStartSingle = false;
      let isRangeEndSingle = false;

      if (this.NovaDatePicker.isRange) {
        const startMoment = selectedMoment[0];
        const endMoment = selectedMoment[1];

        isRangeStart = this.isSameDateMoment(startMoment, dateMoment);
        isRangeEnd = this.isSameDateMoment(endMoment, dateMoment);
        const isEndPanel = this.rangeIndex === 1;

        if (startMoment && !endMoment) {
          isRangeStartSingle = true;
        }

        if (!startMoment && endMoment) {
          isRangeEndSingle = true;
        }

        if (isRangeStart || (isRangeEnd && isEndPanel)) {
          isSelected = true;
        } else if (startMoment && endMoment) {
          if (
            startMoment.isBefore(dateMoment) &&
            endMoment.isAfter(dateMoment)
          ) {
            isInRange = true;
          }
        }
        if (isEndPanel && !isDisabled) {
          const hoverDate = this.NovaDatePicker.hoverDate;
          if (hoverDate) {
            const hoverMoment = dayjs(hoverDate);
            isRangeHoverEnd = hoverMoment.isSame(dateMoment);
            if (
              startMoment &&
              startMoment.isBefore(dateMoment) &&
              hoverMoment.isAfter(dateMoment)
            ) {
              isRangeHover = true;
            }
            if (startMoment && startMoment.isSame(dateMoment)) {
              isRangeHoverStart = true;
            }
          }
        }
      } else {
        if (this.isSameDateMoment(selectedMoment, dateMoment)) {
          isSelected = true;
        }
      }

      if (dateMoment) {
        isPrev = panelMoment.isAfter(dateMoment, 'month');
        isNext = panelMoment.isBefore(dateMoment, 'month');
      }

      const isSpecial = !!this.NovaDatePicker.getSpecialText(dateMoment);
      const isToday = this.NovaDatePicker.isToday(dateMoment);

      return {
        'is-prev': isPrev,
        'is-next': isNext,
        'is-in-range': isInRange,
        'is-range-start': isRangeStart,
        'is-range-start-single': isRangeStartSingle,
        'is-range-end': isRangeEnd,
        'is-range-end-single': isRangeEndSingle,
        'is-range-hover': isRangeHover,
        'is-range-hover-start': isRangeHoverStart,
        'is-range-hover-end': isRangeHoverEnd,
        'is-disabled': isDisabled,
        'is-selected': isSelected,
        'is-special': isSpecial,
        'is-today': isToday
      };
    },
    isDisabled(dateMoment) {
      let rangeDisabled = false;

      if (
        this.isRange &&
        this.rangeIndex === 1 &&
        this.NovaDatePicker.valueMoment
      ) {
        const startMoment = this.NovaDatePicker.valueMoment[0];
        if (startMoment) {
          rangeDisabled = startMoment.isAfter(dateMoment);
        }
      }

      const userDisabled = this.NovaDatePicker.disabledDate.call(
        undefined,
        dateMoment.toDate(),
        this.rangeName
      );
      return userDisabled || rangeDisabled;
    },
    isSameDateMoment(a, b) {
      if (!dayjs.isDayjs(a)) {
        return false;
      }
      if (!dayjs.isDayjs(b)) {
        return false;
      }
      return a.isSame(b, 'day');
    },
    prevMonthClick() {
      const panelMoment = this.NovaDatePicker.panelMoment.add(-1, 'month');
      this.NovaDatePicker.updateShowDate(panelMoment.toDate());
    },
    nextMonthClick() {
      const panelMoment = this.NovaDatePicker.panelMoment.add(1, 'month');
      this.NovaDatePicker.updateShowDate(panelMoment.toDate());
    },
    isDisabledMonthPrev() {
      return this.NovaDatePicker.disabledMonthPrev.call(
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
      return this.NovaDatePicker.disabledMonthNext.call(
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
    },
    getDateDisplay(dateMoment) {
      const specialText = this.NovaDatePicker.getSpecialText(dateMoment);
      if (specialText) {
        return specialText;
      }

      return dateMoment.date();
    }
  },
  render() {
    const {
      defaultFormat,
      getDateDisplay,
      getMomentClassName,
      getMonthNextClass,
      getMonthPrevClass,
      getShowMoment,
      handleDateMouseEnter,
      handleDateMouseLeave,
      handleMomentSelect,
      isDisabledMonthNext,
      isDisabledMonthPrev,
      momentList,
      nextMonthClick,
      novaLocale,
      offset,
      prefixedClass,
      prevMonthClick,
      rangeIndex,
      weeks
    } = this;

    const monthProps = {
      class: `${prefixedClass}-month`,
      attrs: {
        'data-month-offset': offset,
        'data-range-index': rangeIndex
      }
    };

    const prevMonthText = novaLocale.datePicker.prevMonth;
    const prevProps = {
      class: [`${prefixedClass}-prev`, getMonthPrevClass()],
      attrs: {
        title: !isDisabledMonthPrev() ? prevMonthText : ''
      },
      on: {
        click: prevMonthClick
      }
    };
    const prevNode = (
      <div {...prevProps}>
        <NovaIconLeft />
        {prevMonthText}
      </div>
    );
    const showMoment = getShowMoment();
    const titleNode = (
      <div class={`${prefixedClass}-title`}>
        {novaLocale.datePicker.yearAndMonth(
          showMoment.year(),
          showMoment.month()
        )}
      </div>
    );

    const nextMonthText = novaLocale.datePicker.nextMonth;
    const nextProps = {
      class: [`${prefixedClass}-next`, getMonthNextClass()],
      attrs: {
        title: !isDisabledMonthNext() ? nextMonthText : ''
      },
      on: {
        click: nextMonthClick
      }
    };
    const nextNode = (
      <div {...nextProps}>
        <NovaIconRight />
        {nextMonthText}
      </div>
    );
    const headerNode = (
      <div class={`${prefixedClass}-header`}>
        {prevNode}
        {titleNode}
        {nextNode}
      </div>
    );

    const weekList = weeks.map((week, index) => {
      const weekProps = {
        key: index,
        class: [`${prefixedClass}-week`, `${prefixedClass}-${weeks[index]}`]
      };
      return <div {...weekProps}>{novaLocale.datePicker.weeksShort[week]}</div>;
    });
    const weeksNode = <div class={`${prefixedClass}-weeks`}>{weekList}</div>;

    const dateList = momentList.map(dateMoment => {
      const dateProps = {
        key: dateMoment.format(defaultFormat),
        class: [`${prefixedClass}-date`, getMomentClassName(dateMoment)],
        on: {
          click() {
            handleMomentSelect(dateMoment);
          },
          mouseenter(e) {
            handleDateMouseEnter(dateMoment, e);
          },
          mouseleave: handleDateMouseLeave
        }
      };
      return (
        <div {...dateProps}>
          <div class={`${prefixedClass}-date-inner`}>
            {getDateDisplay(dateMoment)}
          </div>
        </div>
      );
    });
    const datesNode = (
      <div class={`${prefixedClass}-dates`} ref="dates">
        {dateList}
      </div>
    );

    const bodyNode = (
      <div class={`${prefixedClass}-body`}>
        {weeksNode}
        {datesNode}
      </div>
    );

    return (
      <div {...monthProps}>
        {headerNode}
        {bodyNode}
      </div>
    );
  }
};
