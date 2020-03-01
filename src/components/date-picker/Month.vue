<template>
  <div
    class="nova-ui-date-picker-month"
    :data-month-offset="offset"
    :data-range-active="rangeCurrentPane"
  >
    <div class="nova-ui-date-picker-header">
      <div
        class="nova-ui-date-picker-prev"
        :class="getMonthPrevClass()"
        @click="prevMonthClick"
        :title="!isDisabledMonthPrev() ? novaLocale.datePicker.prevMonth : ''"
      >
        {{ novaLocale.datePicker.prevMonth }}
      </div>
      <div class="nova-ui-date-picker-title">
        {{
          novaLocale.datePicker.yearAndMonth(
            getShowMoment().year(),
            getShowMoment().month()
          )
        }}
      </div>
      <div
        class="nova-ui-date-picker-next"
        :class="getMonthNextClass()"
        @click="nextMonthClick"
        :title="!isDisabledMonthNext() ? novaLocale.datePicker.prevMonth : ''"
      >
        {{ novaLocale.datePicker.nextMonth }}
      </div>
    </div>
    <div class="nova-ui-date-picker-body">
      <div class="nova-ui-date-picker-weeks">
        <div
          class="nova-ui-date-picker-week"
          :class="'nova-ui-date-picker-' + weeks[titleIndex]"
          v-for="(title, titleIndex) in weeks"
          :key="titleIndex"
        >
          <template>{{ novaLocale.datePicker.weeksShort[title] }}</template>
        </div>
      </div>
      <div class="nova-ui-date-picker-dates" ref="datesRef">
        <div
          class="nova-ui-date-picker-date"
          :class="getMomentClassName(dateMoment)"
          v-for="dateMoment in momentList"
          :key="dateMoment.format('YYYY-MM-DD')"
          @click="handleMomentSelect(dateMoment)"
          @mouseenter="handleDateMouseEnter(dateMoment, $event)"
          @mouseleave="handleDateMouseLeave"
        >
          <template>{{ getDateDisplay(dateMoment) }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

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
      isRange: NovaDatePicker.isRange
    };
  },
  computed: {
    rangeCurrentPane() {
      return this.NovaDatePicker.rangeCurrentPane;
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

      if (!(this.isRange && this.rangeCurrentPane === 1)) {
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
            moment(date).startOf('day')
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
      let firstMomentOfPane = firstMomentOfMonth
        .clone()
        .subtract(dayOfWeek, 'days');

      let momentList = new Array(7 * 6).fill(null);
      this.momentList = momentList.map((d, index) => {
        return firstMomentOfPane.clone().add(index, 'days');
      });

      this.openDefaultTooltip(true);
    },
    openDefaultTooltip(first) {
      this.momentList.forEach((dateMoment, index) => {
        if (this.isRange) {
          let selectedMoment = this.NovaDatePicker.valueMoment;

          if (this.rangeCurrentPane === 1) {
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
        let $endDate = $ref.querySelectorAll('.nova-ui-date-picker-date')[
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
      return this.NovaDatePicker.paneMoment.clone().add(this.offset, 'months');
    },
    getMomentClassName(dateMoment) {
      let paneMoment = this.getShowMoment();
      let selectedMoment = this.NovaDatePicker.valueMoment;

      let isDisabled = this.isDisabled(dateMoment);
      let isSelected = false;
      let isInRange = false;
      let isRangeEndHover = false;
      let isInHoverRange = false;
      let isPrev = false;
      let isNext = false;

      if (this.NovaDatePicker.isRange) {
        let startMoment = selectedMoment[0];
        let endMoment = selectedMoment[1];

        let isStartMoment = this.isSameDate(startMoment, dateMoment);
        let isEndMoment = this.isSameDate(endMoment, dateMoment);
        let isEndPane = this.rangeCurrentPane === 1;

        if (isStartMoment || (isEndMoment && isEndPane)) {
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
            let hoverMoment = moment(hoverDate);
            isRangeEndHover = hoverMoment.isSame(dateMoment);
            if (
              startMoment &&
              startMoment.isBefore(dateMoment) &&
              hoverMoment.isAfter(dateMoment)
            ) {
              isInHoverRange = true;
            }
          }
        }
      } else {
        if (this.isSameDate(selectedMoment, dateMoment)) {
          isSelected = true;
        }
      }

      if (dateMoment) {
        isPrev = paneMoment.isAfter(dateMoment, 'month');
        isNext = paneMoment.isBefore(dateMoment, 'month');
      }

      let isSpecial = !!this.NovaDatePicker.getSpecialText(dateMoment);

      return {
        'is-prev': isPrev,
        'is-next': isNext,
        'is-in-range': isInRange,
        'is-range-end-hover': isRangeEndHover,
        'is-in-hover-range': isInHoverRange,
        'is-disabled': isDisabled,
        'is-selected': isSelected,
        'is-special': isSpecial
      };
    },
    isDisabled(dateMoment) {
      let rangeDisabled = false;

      if (
        this.isRange &&
        this.rangeCurrentPane === 1 &&
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
        this.rangeCurrentPane
      );
      return userDisabled || rangeDisabled;
    },
    isSameDate(a, b) {
      if (!moment.isMoment(a)) {
        return false;
      }
      if (!moment.isMoment(b)) {
        return false;
      }
      return a.isSame(b, 'day');
    },
    prevMonthClick() {
      let paneMoment = this.NovaDatePicker.paneMoment.clone().add(-1, 'months');
      this.NovaDatePicker.updateShowDate(paneMoment.toDate());
    },
    nextMonthClick() {
      let paneMoment = this.NovaDatePicker.paneMoment.clone().add(1, 'months');
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

  &[data-range-active='1'] {
    .@{date-picket}-date.is-in-range:not(.is-disabled):not(.is-selected) {
      background-color: #fcdaed;

      &:hover:not(.is-disabled):not(.is-selected) {
        background-color: #fef2f9;
        color: #ee3388;
      }
    }

    .@{date-picket}-date.is-in-hover-range:not(.is-disabled):not(.is-selected) {
      background-color: #fcdaed;
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
  width: 30px;
  height: 20px;
  padding: 5px 0;
  display: inline-block;
  vertical-align: top;
}

.@{date-picket}-week {
  &.@{date-picket}-sun,
  &.@{date-picket}-sat {
    color: #ee3388;
  }
}

.@{date-picket}-date {
  cursor: pointer;

  &.is-special {
    color: #ee3388;
  }

  &:hover:not(.is-disabled):not(.is-selected) {
    background-color: #fef2f9;
    color: #ee3388;
  }

  &.is-selected {
    background-color: #ff77bb;
    color: #fff;
  }

  &.is-disabled {
    opacity: 0.35;
    cursor: default;
  }

  &.is-range-end-hover {
    background-color: #ff77bb;
    color: #fff;
  }

  &.is-prev,
  &.is-next {
    visibility: hidden;
  }
}

.@{date-picket}-weeks {
  background-color: #eee;
}

.@{date-picket}-dates {
}
</style>
