<template>
  <div class="nova-ui-calendar" v-bind="$attrs" v-on="$listeners">
    <div class="nova-ui-calendar-months">
      <Month
        ref="monthRef"
        :nova-locale="novaLocale"
        v-for="(month, monthIndex) in showMonthSize"
        :offset="monthIndex"
        :key="monthIndex"
      >
        <template slot="dateCellRender" slot-scope="scope">
          <slot
            name="dateCellRender"
            :date="scope.date"
            :index="scope.index"
            :offset="scope.offset"
            :paneDate="scope.paneDate"
          ></slot>
        </template>
      </Month>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Calendar from '@/utils/calendar';
import locale from '@/mixin/locale';
import Month from '@/components/calendar/Month';

export default {
  name: 'NovaCalendar',
  mixins: [locale],
  model: {
    event: 'update'
  },
  components: {
    Month
  },
  provide() {
    return {
      NovaCalendar: this
    };
  },
  props: {
    value: {},
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
    let defaultDate = moment();
    if (this.value) {
      defaultDate = moment(this.value);
    }
    let first = Calendar.getFirstDateMomentOfMonth(defaultDate);
    this.$emit('update', first.toDate());
    return {
      weeks: Calendar.weeks,
      paneMoment: first,
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
      if (moment.isDate(date)) {
        this.paneMoment = Calendar.getFirstDateMomentOfMonth(date);
      }

      this.refreshDateList();
      this.$emit('update', this.paneMoment.toDate());
      this.$emit('panelChange', this.paneMoment.toDate());
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

<style lang="less">
@import '../../styles/var';

@calendar: @{prefixed}-calendar;

.@{calendar} {
  width: 1196px;
  font-family: @font-family;
  font-size: 12px;
  background-color: #fff;
}
</style>
