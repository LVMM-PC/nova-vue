<template>
  <div class="nova-calendar-month">
    <div class="nova-calendar-header">
      <div class="nova-calendar-weeks">
        <div
          v-for="(title, titleIndex) in weeks"
          :key="titleIndex"
          :class="'nova-calendar-' + weeks[titleIndex]"
          class="nova-calendar-week"
        >
          {{ novaLocale.datePicker.weeksShort[title] }}
        </div>
      </div>
    </div>
    <div class="nova-calendar-content">
      <div class="nova-calendar-dates">
        <div
          v-for="(dateMoment, dateMomentIndex) in momentList"
          :key="dateMoment.format(defaultFormat)"
          :class="getMomentClassName(dateMoment)"
          class="nova-calendar-date"
        >
          <slot
            :date="dateMoment.toDate()"
            :index="dateMomentIndex"
            :offset="offset"
            :panelDate="getShowMoment().toDate()"
            name="dateCellRender"
          >
            <div class="nova-calendar-date-number">
              {{ dateMoment.date() }}
            </div>
          </slot>
        </div>
      </div>
    </div>
    <div class="nova-calendar-sidebar">
      <div
        :class="getMonthPrevClass()"
        :title="!isDisabledMonthPrev() ? novaLocale.datePicker.prevMonth : ''"
        class="nova-calendar-prev"
        @click="prevMonthClick"
      >
        {{ novaLocale.datePicker.prevMonth }}
      </div>
      <div class="nova-calendar-title">
        <span class="nova-calendar-title-support"></span>
        <span class="nova-calendar-title-text">{{ getCalendarTitle() }}</span>
      </div>

      <div
        :class="getMonthNextClass()"
        :title="!isDisabledMonthNext() ? novaLocale.datePicker.nextMonth : ''"
        class="nova-calendar-next"
        @click="nextMonthClick"
      >
        {{ novaLocale.datePicker.nextMonth }}
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
  }
};
</script>
