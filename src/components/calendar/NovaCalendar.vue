<template>
  <div class="nova-calendar" v-bind="$attrs" v-on="$listeners">
    <div class="nova-calendar-months">
      <Month
        v-for="(month, monthIndex) in showMonthSize"
        :key="monthIndex"
        ref="monthRef"
        :nova-locale="novaLocale"
        :offset="monthIndex"
      >
        <template v-slot:dateCellRender="slotProps">
          <slot
            :date="slotProps.date"
            :index="slotProps.index"
            :offset="slotProps.offset"
            :panelDate="slotProps.panelDate"
            name="dateCellRender"
          ></slot>
        </template>
      </Month>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Calendar from '@/utils/calendar';
import locale from '@/mixin/locale';
import Month from './Month.vue';

export default {
  name: 'NovaCalendar',
  components: {
    Month
  },
  mixins: [locale],
  model: {
    event: 'update'
  },
  provide() {
    return {
      NovaCalendar: this
    };
  },
  props: {
    value: {
      type: Date,
      default: null
    },
    disabledDate: {
      type: Function,
      default: () => {
        return false;
      }
    },
    disabledMonthPrev: {
      type: Function,
      default: () => {
        return false;
      }
    },
    disabledMonthNext: {
      type: Function,
      default: () => {
        return false;
      }
    },
    monthSize: {
      type: Number,
      default: 1
    }
  },
  data() {
    let defaultDate = dayjs();
    if (this.value) {
      defaultDate = dayjs(this.value);
    }
    let first = Calendar.getFirstDateMomentOfMonth(defaultDate);
    this.$emit('update', first.toDate());
    return {
      weeks: Calendar.weeks,
      panelMoment: first,
      defaultFormat: Calendar.defaultFormat
    };
  },
  computed: {
    showMonthSize() {
      return this.monthSize;
    }
  },
  methods: {
    updateShowDate(date) {
      if (!date) {
        return;
      }
      if (dayjs(date).isValid()) {
        this.panelMoment = Calendar.getFirstDateMomentOfMonth(date);
      }

      this.refreshDateList();
      this.$emit('update', this.panelMoment.toDate());
      this.$emit('panelChange', this.panelMoment.toDate());
    },
    refreshDateList() {
      let monthRef = this.$refs['monthRef'];
      if (!monthRef) {
        return;
      }
      monthRef.forEach($month => {
        $month.refreshDateList();
      });
    }
  }
};
</script>
