import dayjs from 'dayjs';
import Inventory from '@/utils/inventory';
import Calendar from '@/utils/calendar';
import locale from '@/mixin/locale';
import Month from './Month.jsx';

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
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-calendar`
    },
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
    const first = Calendar.getFirstDateMomentOfMonth(defaultDate);
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
      const $months = this.$refs['month'];
      if (!$months) {
        return;
      }
      $months.forEach($month => {
        $month.refreshDateList();
      });
    }
  },
  render() {
    const {
      $attrs,
      $listeners,
      $scopedSlots,
      novaLocale,
      prefixedClass,
      showMonthSize
    } = this;

    const calendarProps = {
      class: prefixedClass,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      }
    };

    let monthScopedSlots = {};
    if ($scopedSlots.dateCellRender) {
      monthScopedSlots = {
        dateCellRender: slotProps => {
          return $scopedSlots.dateCellRender(slotProps);
        }
      };
    }

    const monthList = Array(showMonthSize)
      .fill(null)
      .map((empty, index) => {
        const monthProps = {
          key: index,
          props: {
            novaLocale,
            offset: index
          },
          ref: 'month',
          refInFor: true,
          scopedSlots: monthScopedSlots
        };

        return <Month {...monthProps}></Month>;
      });

    return (
      <div {...calendarProps}>
        <div class={`${prefixedClass}-months`}>{monthList}</div>
      </div>
    );
  }
};
