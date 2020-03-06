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
        :title="!isDisabledMonthNext() ? novaLocale.datePicker.prevMonth : ''"
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
  mounted() {
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
        let night = this.novaLocale.datePickerRange.night;
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
      let firstMomentOfPane = firstMomentOfMonth.subtract(dayOfWeek, 'days');

      let momentList = new Array(7 * 6).fill(null);
      this.momentList = momentList.map((d, index) => {
        return firstMomentOfPane.add(index, 'days');
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
              let night = this.novaLocale.datePickerRange.night;
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
      return this.NovaDatePicker.paneMoment.add(this.offset, 'month');
    },
    getMomentClassName(dateMoment) {
      let paneMoment = this.getShowMoment();
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
        let isEndPane = this.rangeIndex === 1;

        if (startMoment && !endMoment) {
          isRangeStartSingle = true;
        }

        if (!startMoment && endMoment) {
          isRangeEndSingle = true;
        }

        if (isRangeStart || (isRangeEnd && isEndPane)) {
          isSelected = true;
        } else if (startMoment && endMoment) {
          if (
            startMoment.isBefore(dateMoment) &&
            endMoment.isAfter(dateMoment)
          ) {
            isInRange = true;
          }
        }
        if (isEndPane && !isDisabled) {
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
        isPrev = paneMoment.isAfter(dateMoment, 'month');
        isNext = paneMoment.isBefore(dateMoment, 'month');
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
      let paneMoment = this.NovaDatePicker.paneMoment.add(-1, 'month');
      this.NovaDatePicker.updateShowDate(paneMoment.toDate());
    },
    nextMonthClick() {
      let paneMoment = this.NovaDatePicker.paneMoment.add(1, 'month');
      this.NovaDatePicker.updateShowDate(paneMoment.toDate());
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

<style lang="less">
@import '../../styles/var';

@date-picket: @{prefixed}-date-picker;

.@{date-picket}-month {
  white-space: normal;
  vertical-align: top;
  display: inline-block;
  font-size: 12px;
  text-align: center;
  border-right: 2px solid #f5f5f5;

  &:last-child {
    border-right: none;
  }

  &[data-range-index='1'] {
    .@{date-picket}-date {
      &:before {
        position: absolute;
        content: '';
        display: block;
        width: 30px;
        height: 26px;
      }
    }

    .@{date-picket}-date.is-range-start:not(.is-range-start-single) {
      &:before {
        background-color: #fcdaed;
        width: 2px;
        right: 0;
      }
    }

    .@{date-picket}-date.is-range-end {
      &:before {
        background-color: #fcdaed;
      }

      &:not(.is-range-hover) {
        &:before {
          width: 2px;
        }
      }
    }

    .@{date-picket}-date.is-range-hover-end:not(.is-in-range) {
      &:before {
        width: 2px;
        background-color: #fcdaed;
      }
    }

    .@{date-picket}-date.is-range-hover-start:not(.is-in-range) {
      &:before {
        right: 0;
        width: 2px;
        background-color: #fcdaed;
      }
    }

    .@{date-picket}-date.is-range-start.is-range-end {
      &:before {
        width: 0;
      }
    }

    .@{date-picket}-date.is-range-start.is-range-end.is-range-hover-start {
      &:before {
        width: 2px;
      }
    }

    .@{date-picket}-date.is-range-start.is-range-end.is-range-hover-start.is-range-hover-end,
    .@{date-picket}-date.is-range-start.is-range-start-single.is-range-hover-start.is-range-hover-end {
      &:before {
        width: 0;
      }
    }

    .@{date-picket}-date.is-in-range:not(.is-disabled):not(.is-selected) {
      &:before {
        background-color: #fcdaed;
      }
    }

    .@{date-picket}-date.is-range-hover:not(.is-disabled):not(.is-selected):not(.is-in-range) {
      &:before {
        background-color: #fcdaed;
      }
    }
  }
}

.@{date-picket}-body {
  padding: 4px;
}

.@{date-picket}-header {
  text-align: center;
  height: 28px;
  margin: -1px -1px 0 -1px;
  color: #fff;
  background-color: #ee3388;
}

.@{date-picket}-prev,
.@{date-picket}-next {
  display: inline-block;
  vertical-align: top;
  width: 28px;
  height: 28px;
  cursor: pointer;
  font-size: 0;

  &:before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    margin: 2px;
  }

  &.is-hidden {
    visibility: hidden;
  }

  &.is-disabled {
    visibility: hidden;
  }

  &:hover {
    background-color: #a81c54;
  }
}

.@{date-picket}-prev {
  float: left;

  &:before {
    background-image: url(../../assets/icons/date-picker-prev.svg);
  }
}

.@{date-picket}-next {
  float: right;

  &:before {
    background-image: url(../../assets/icons/date-picker-next.svg);
  }
}

.@{date-picket}-title {
  font-size: 14px;
  padding: 4px;
  box-sizing: border-box;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}

.@{date-picket}-weeks,
.@{date-picket}-dates {
  width: 30 * 7px;
}

.@{date-picket}-week,
.@{date-picket}-date {
  box-sizing: border-box;
  width: 30px;
  display: inline-block;
  vertical-align: top;
}

.@{date-picket}-week {
  height: 28px;
  margin-bottom: 2px;
  background-color: #eee;
  padding: 4px 0;

  &.@{date-picket}-sun,
  &.@{date-picket}-sat {
    color: #ee3388;
  }
}

.@{date-picket}-date {
  position: relative;
  cursor: pointer;
  height: 30px;
  padding: 2px 0;

  &.is-special {
    .@{date-picket}-date-inner {
      color: #ee3388;
    }
  }

  &.is-today {
    .@{date-picket}-date-inner {
      color: #ee3388;
      border: 1px solid #ee3388;
      padding: 2px 0;
    }
  }

  &:hover:not(.is-disabled):not(.is-selected) {
    .@{date-picket}-date-inner {
      background-color: #fef2f9;
      color: #ee3388;
    }
  }

  &.is-selected {
    .@{date-picket}-date-inner {
      background-color: #ff77bb;
      color: #fff;
    }
  }

  &.is-disabled {
    cursor: default;

    .@{date-picket}-date-inner {
      opacity: 0.35;
    }
  }

  &.is-range-hover-end {
    .@{date-picket}-date-inner {
      background-color: #ff77bb;
      color: #fff;
    }
  }

  &.is-prev,
  &.is-next {
    visibility: hidden;
  }
}

.@{date-picket}-date-inner {
  position: relative;
  box-sizing: border-box;
  width: 26px;
  height: 26px;
  padding: 3px 0;
  margin: 0 auto;
}

.@{date-picket}-weeks {
}

.@{date-picket}-dates {
}
</style>
