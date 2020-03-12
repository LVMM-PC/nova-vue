<template>
  <div
    class="nova-date-picker-month"
    :data-month-offset="offset"
    :data-range-index="rangeIndex"
  >
    <div class="nova-date-picker-header">
      <div
        class="nova-date-picker-prev"
        :class="getMonthPrevClass()"
        @click="prevMonthClick"
        :title="!isDisabledMonthPrev() ? novaLocale.datePicker.prevMonth : ''"
      >
        {{ novaLocale.datePicker.prevMonth }}
      </div>
      <div class="nova-date-picker-title">
        {{
          novaLocale.datePicker.yearAndMonth(
            getShowMoment().year(),
            getShowMoment().month()
          )
        }}
      </div>
      <div
        class="nova-date-picker-next"
        :class="getMonthNextClass()"
        @click="nextMonthClick"
        :title="!isDisabledMonthNext() ? novaLocale.datePicker.nextMonth : ''"
      >
        {{ novaLocale.datePicker.nextMonth }}
      </div>
    </div>
    <div class="nova-date-picker-body">
      <div class="nova-date-picker-weeks">
        <div
          class="nova-date-picker-week"
          :class="'nova-date-picker-' + weeks[titleIndex]"
          v-for="(title, titleIndex) in weeks"
          :key="titleIndex"
        >
          <template>{{ novaLocale.datePicker.weeksShort[title] }}</template>
        </div>
      </div>
      <div class="nova-date-picker-dates" ref="datesRef">
        <div
          class="nova-date-picker-date"
          :class="getMomentClassName(dateMoment)"
          v-for="dateMoment in momentList"
          :key="dateMoment.format(defaultFormat)"
          @click="handleMomentSelect(dateMoment)"
          @mouseenter="handleDateMouseEnter(dateMoment, $event)"
          @mouseleave="handleDateMouseLeave"
        >
          <div class="nova-date-picker-date-inner">
            {{ getDateDisplay(dateMoment) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Calendar from '@/utils/calendar';

export default {
  name: 'Month',
  inject: ['NovaDatePicker'],
  props: {
    offset: {
      type: Number,
      default: 0
    },
    novaLocale: {
      type: Object
    },
    novaHoliday: {
      type: Object
    }
  },
  data() {
    let NovaDatePicker = this.NovaDatePicker;
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

      let selectedMoment = this.NovaDatePicker.valueMoment;
      if (selectedMoment[0]) {
        let diff = date.diff(selectedMoment[0], 'days');

        this.NovaDatePicker.updateHoverDate(date.toDate());
        let night = this.novaLocale.datePicker.night;
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
      let firstMomentOfMonth = this.getShowMoment();

      let dayOfWeek = firstMomentOfMonth.day();
      let firstMomentOfPanel = firstMomentOfMonth.subtract(dayOfWeek, 'days');

      let momentList = new Array(7 * 6).fill(null);
      this.momentList = momentList.map((d, index) => {
        return firstMomentOfPanel.add(index, 'days');
      });

      this.openDefaultTooltip(true);
    },
    openDefaultTooltip(first) {
      this.momentList.forEach((dateMoment, index) => {
        if (this.isRange) {
          let selectedMoment = this.NovaDatePicker.valueMoment;

          if (this.rangeIndex === 1) {
            let startDate = selectedMoment[0];
            let endDate = selectedMoment[1];

            let isEndDate = dateMoment.isSame(endDate, 'day');
            if (startDate && endDate && isEndDate) {
              let isSameMonth = this.getShowMoment().isSame(endDate, 'month');

              if (!isSameMonth) {
                return;
              }

              let diff = endDate.diff(startDate, 'days');
              let night = this.novaLocale.datePicker.night;
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
      function run() {
        let $ref = this.$refs['datesRef'];
        let $endDate = $ref.querySelectorAll('.nova-date-picker-date')[index];

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
      let panelMoment = this.getShowMoment();
      let selectedMoment = this.NovaDatePicker.valueMoment;

      let isDisabled = this.isDisabled(dateMoment);
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
        let startMoment = selectedMoment[0];
        let endMoment = selectedMoment[1];

        isRangeStart = this.isSameDateMoment(startMoment, dateMoment);
        isRangeEnd = this.isSameDateMoment(endMoment, dateMoment);
        let isEndPanel = this.rangeIndex === 1;

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
          let hoverDate = this.NovaDatePicker.hoverDate;
          if (hoverDate) {
            let hoverMoment = dayjs(hoverDate);
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

      let isSpecial = !!this.NovaDatePicker.getSpecialText(dateMoment);
      let isToday = this.NovaDatePicker.isToday(dateMoment);

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
        let startMoment = this.NovaDatePicker.valueMoment[0];
        if (startMoment) {
          rangeDisabled = startMoment.isAfter(dateMoment);
        }
      }

      let userDisabled = this.NovaDatePicker.disabledDate.call(
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
      let panelMoment = this.NovaDatePicker.panelMoment.add(-1, 'month');
      this.NovaDatePicker.updateShowDate(panelMoment.toDate());
    },
    nextMonthClick() {
      let panelMoment = this.NovaDatePicker.panelMoment.add(1, 'month');
      this.NovaDatePicker.updateShowDate(panelMoment.toDate());
    },
    isDisabledMonthPrev() {
      return this.NovaDatePicker.disabledMonthPrev.call(
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
      return this.NovaDatePicker.disabledMonthNext.call(
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
    },
    getDateDisplay(dateMoment) {
      let specialText = this.NovaDatePicker.getSpecialText(dateMoment);
      if (specialText) {
        return specialText;
      }

      return dateMoment.date();
    }
  }
};
</script>
