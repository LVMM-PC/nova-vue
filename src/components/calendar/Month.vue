<template>
  <div class="nova-calendar-month">
    <div class="nova-calendar-weeks">
      <div
        class="nova-calendar-week"
        :class="'nova-calendar-' + weeks[titleIndex]"
        v-for="(title, titleIndex) in weeks"
        :key="titleIndex"
      >
        {{ novaLocale.datePicker.weeksLong[title] }}
      </div>
    </div>
    <div class="nova-calendar-content">
      <div class="nova-calendar-header">
        <div
          class="nova-calendar-prev"
          :class="getMonthPrevClass()"
          @click="prevMonthClick"
          :title="!isDisabledMonthPrev() ? novaLocale.datePicker.prevMonth : ''"
        >
          {{ novaLocale.datePicker.prevMonth }}
        </div>
        <div class="nova-calendar-title">
          <span class="nova-calendar-title-support"></span>
          <span
            class="nova-calendar-title-text"
            v-html="getCalendarTitle()"
          ></span>
        </div>

        <div
          class="nova-calendar-next"
          :class="getMonthNextClass()"
          @click="nextMonthClick"
          :title="!isDisabledMonthNext() ? novaLocale.datePicker.prevMonth : ''"
        >
          {{ novaLocale.datePicker.nextMonth }}
        </div>
      </div>

      <div class="nova-calendar-dates">
        <div
          class="nova-calendar-date"
          :class="getMomentClassName(dateMoment)"
          v-for="(dateMoment, dateMomentIndex) in momentList"
          :key="dateMoment.format(defaultFormat)"
        >
          <slot
            name="dateCellRender"
            :date="dateMoment.toDate()"
            :index="dateMomentIndex"
            :offset="offset"
            :paneDate="getShowMoment().toDate()"
          >
            <div class="nova-calendar-date-number">
              {{ dateMoment.date() }}
            </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Month',
  inject: ['NovaCalendar'],
  props: {
    offset: {
      type: Number,
      default: 0
    },
    novaLocale: {
      type: Object
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.refreshDateList();
    },
    refreshDateList() {
      let firstMomentOfMonth = this.getShowMoment();
      let dayOfWeek = firstMomentOfMonth.day();
      let firstMomentOfPane = firstMomentOfMonth.subtract(dayOfWeek, 'days');

      let momentList = new Array(7 * 6).fill(null);
      this.momentList = momentList.map((d, index) => {
        return firstMomentOfPane.add(index, 'days');
      });
    },
    getCalendarTitle() {
      let showMoment = this.getShowMoment();
      return this.novaLocale.datePicker
        .yearAndMonth(showMoment.year(), showMoment.month())
        .toString()
        .replace(' ', '<br>');
    },
    getShowMoment() {
      return this.NovaCalendar.paneMoment.add(this.offset, 'month');
    },
    getMomentClassName(dateMoment) {
      let paneMoment = this.getShowMoment();
      let isDisabled = this.isDisabled(dateMoment);

      let isPrev = false;
      let isNext = false;
      if (dateMoment) {
        isPrev = paneMoment.isAfter(dateMoment, 'month');
        isNext = paneMoment.isBefore(dateMoment, 'month');
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

      let paneMoment = this.NovaCalendar.paneMoment.add(-1, 'month');
      this.NovaCalendar.updateShowDate(paneMoment.toDate());
    },
    nextMonthClick() {
      if (this.isDisabledMonthNext()) {
        return;
      }

      let paneMoment = this.NovaCalendar.paneMoment.add(1, 'month');
      this.NovaCalendar.updateShowDate(paneMoment.toDate());
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
  }
};
</script>

<style lang="less">
@import '../../styles/var';

@calendar: @{prefixed}-calendar;

.@{calendar}-month {
  border: 1px solid #eee;
}

.@{calendar}-content {
  position: relative;
}

.@{calendar}-month + .@{calendar}-month {
  margin-top: -1px;
}

.@{calendar}-month {
  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 1198px;
    height: 1px;
    border-top: 1px solid #f90;
    margin-left: -1px;
    margin-top: -1px;
  }

  &:first-child {
    &:before {
      display: none;
    }
  }
}

.@{calendar}-header {
  width: 75px;
  position: absolute;
  height: 100%;
  right: 0;
}

.@{calendar}-prev,
.@{calendar}-next {
  font-size: 0;
  visibility: hidden;
  width: 75px;
  height: 95px;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    width: 32px;
    height: 18px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-image: url(../../assets/icons/calendar-next.svg);
  }

  &:hover:not(.is-disabled) {
    cursor: pointer;
    background-color: #f5f5f5;
  }
}

.@{calendar}-prev {
  &:before {
    background-image: url(../../assets/icons/calendar-prev.svg);
  }

  &:hover {
    &:before {
      background-image: url(../../assets/icons/calendar-prev-hover.svg);
    }
  }

  &.is-disabled {
    &:before {
      background-image: url(../../assets/icons/calendar-prev-disabled.svg);
    }
  }
}

.@{calendar}-next {
  bottom: 0;

  &:before {
    background-image: url(../../assets/icons/calendar-next.svg);
  }

  &:hover {
    &:before {
      background-image: url(../../assets/icons/calendar-next-hover.svg);
    }
  }

  &.is-disabled {
    &:before {
      background-image: url(../../assets/icons/calendar-next-disabled.svg);
    }
  }
}

.@{calendar}-month:first-child {
  .@{calendar}-prev {
    visibility: visible;
  }
}

.@{calendar}-month:last-child {
  .@{calendar}-next {
    visibility: visible;
  }
}

.@{calendar}-title {
  hyphens: auto;
  word-break: break-all;
  text-align: center;
  font-size: 16px;
  width: 75px;
  height: 379px;
  color: #666;
  padding: 5px 5px 5px 5px;
  box-sizing: border-box;
  user-select: none;
}

.@{calendar}-title-support {
  display: inline-block;
  width: 0;
  font-size: 0;
  height: 100%;
  vertical-align: middle;
}

.@{calendar}-title-text {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
}
.@{calendar}-weeks {
  border-bottom: 1px solid #eee;
  height: 40px;
}

.@{calendar}-week {
  color: #666;
  box-sizing: border-box;
  width: 160px;
  display: inline-block;
  vertical-align: top;
  height: 40px;
  font-size: 16px;
  text-align: center;
  line-height: 20px;
  padding: 10px;

  &.@{calendar}-sun,
  &.@{calendar}-sat {
    color: #f60;
  }
}

.@{calendar}-dates {
  user-select: none;
  display: inline-block;
  vertical-align: top;
  padding: 1px 0 0 1px;
  width: 1120px;
  margin: -1px;
}

.@{calendar}-date {
  position: relative;
  display: inline-block;
  vertical-align: top;
  width: 161px;
  height: 96px;
  border: 1px solid #eee;
  box-sizing: border-box;
  margin-left: -1px;
  margin-top: -1px;

  &.is-prev,
  &.is-next {
    color: #bababa;
  }

  &.is-disabled {
    color: #bababa;
  }
}

.@{calendar}-date-number {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100px;
  height: 12px;
  line-height: 12px;
}
</style>
