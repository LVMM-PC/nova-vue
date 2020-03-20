import dayjs from 'dayjs';
import Utils from '@/utils/utils';
import Storage from '@/utils/storage';
import Calendar from '@/utils/calendar';
import locale from '@/mixin/locale';
import NovaDropdown from '@/components/dropdown/NovaDropdown.jsx';
import Month from './Month.jsx';

export default {
  name: 'NovaDatePicker',
  components: {
    NovaDropdown,
    Month
  },
  mixins: [locale],
  provide() {
    return {
      NovaDatePicker: this
    };
  },
  model: {
    event: 'update'
  },
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-date-picker`
    },
    value: {
      type: [Date, Array],
      default: null
    },
    placeholder: {
      type: [String, Array],
      default: undefined
    },
    format: {
      type: String,
      default: Calendar.defaultFormat
    },
    disabled: {
      type: [Boolean, Array],
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'date'
    },
    monthSize: {
      type: Number,
      default: null
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showTooltip: {
      type: Boolean,
      default: false
    },
    customTooltip: {
      type: Function,
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
    dropdownClass: {
      type: String,
      default: null
    }
  },
  data() {
    const first = Calendar.getFirstDateMomentOfMonth(dayjs());
    return {
      blurTimer: null,
      startBlurTimer: null,
      endBlurTimer: null,
      weeks: Calendar.weeks,
      panelMoment: first,
      dropdownLoaded: false,
      opened: false,
      rangeIndex: 0,
      hoverDate: null,
      defaultEndTooltip: null,
      tooltip: {
        text: '',
        visible: false,
        offset: {
          left: 0,
          top: 0
        }
      }
    };
  },
  computed: {
    datePickerClass() {
      let { prefixedClass } = this;

      return {
        'is-open': this.opened,
        [`${prefixedClass}-range`]: this.isRange
      };
    },
    isDisabled() {
      const disabled = this.disabled;
      const isArray = Array.isArray(disabled);
      if (!isArray) {
        return disabled;
      }
      return false;
    },
    startDisabled() {
      const disabled = this.disabled;
      const isArray = Array.isArray(disabled);
      if (!isArray) {
        return disabled;
      }
      return disabled[0];
    },
    endDisabled() {
      const disabled = this.disabled;
      const isArray = Array.isArray(disabled);
      if (!isArray) {
        return disabled;
      }
      return disabled[1];
    },
    showMonthSize() {
      if (this.monthSize) {
        return this.monthSize;
      }
      if (this.type === 'range') {
        return 2;
      }
      return 1;
    },
    isRange() {
      return this.type === 'range';
    },
    rangeName() {
      if (!this.isRange) {
        return null;
      }

      switch (this.rangeIndex) {
        case 0:
          return 'start';
        case 1:
          return 'end';
        default:
          return this.rangeIndex;
      }
    },
    displayedDate() {
      const date = this.value;

      return this.dateFormat(date);
    },
    displayedRange() {
      const value = this.value;
      if (!value) {
        return;
      }
      const startDate = value[0];
      const endDate = value[1];
      const startText = this.dateFormat(startDate);
      const endText = this.dateFormat(endDate);
      return {
        start: startText,
        end: endText
      };
    },
    valueMoment() {
      const date = this.value;
      if (this.isRange) {
        return [this.dateToMoment(date[0]), this.dateToMoment(date[1])];
      } else {
        return this.dateToMoment(date);
      }
    },
    datePlaceholder() {
      const novaLocale = this.novaLocale;

      const placeholder = this.placeholder;
      if (placeholder === undefined) {
        return novaLocale.datePicker.placeholder;
      }
      return placeholder;
    },
    startPlaceholder() {
      const novaLocale = this.novaLocale;

      const placeholder = this.placeholder;
      if (
        placeholder === undefined ||
        (placeholder && placeholder[0] === undefined)
      ) {
        return novaLocale.datePicker.rangePlaceholder[0];
      }

      const isArray = Array.isArray(placeholder);
      if (isArray) {
        return placeholder[0];
      }
      return placeholder;
    },
    endPlaceholder() {
      const novaLocale = this.novaLocale;

      const placeholder = this.placeholder;
      if (
        placeholder === undefined ||
        (placeholder && placeholder[1] === undefined)
      ) {
        return novaLocale.datePicker.rangePlaceholder[1];
      }

      const isArray = Array.isArray(placeholder);
      if (isArray) {
        return placeholder[1];
      }
      return placeholder;
    }
  },
  created() {
    this.init();
  },
  destroyed() {
    this.closeDropdown(true);
  },
  methods: {
    init() {
      this.refreshDateList();
    },
    isToday(dateMoment) {
      const now = dayjs();
      return dateMoment.isSame(now, 'date');
    },
    getSpecialText(dateMoment) {
      const ymd = dateMoment.format(Calendar.defaultFormat);

      const holiday = this.novaHoliday;
      if (holiday) {
        const holidayDetail = holiday[ymd];
        if (holidayDetail && holidayDetail.isMain) {
          return holidayDetail.shortTitle;
        }
      }

      return null;
    },
    getWeekTitle(date) {
      const novaLocale = this.novaLocale;
      if (!date) {
        return;
      }
      const day = dayjs(date).day();
      return novaLocale.datePicker.weeksLong[this.weeks[day]];
    },
    getSuffixText(date) {
      const dateMoment = dayjs(date);
      const specialText = this.getSpecialText(dateMoment);
      if (specialText) {
        return specialText;
      }

      return this.getWeekTitle(date);
    },
    openImplement: function() {
      if (!this.dropdownLoaded) {
        this.dropdownLoaded = true;
        this.$nextTick(() => {
          this.openImplement();
        });
        return;
      }

      clearTimeout(this.blurTimer);

      if (this.disabled) {
        return;
      }

      if (this.opened) {
        return;
      }

      this.opened = true;
      const inner = this.$refs['inner'];
      this.updateShowDate(this.value);
      this.openDropdown(inner);
    },
    handleInputFocus(e) {
      if (this.disabled) {
        return;
      }
      this.openImplement();

      this.$emit('focus', e);
    },
    handleInputClick() {
      if (this.disabled) {
        return;
      }
      this.openImplement();
    },
    openStartImplement: function() {
      if (!this.dropdownLoaded) {
        this.dropdownLoaded = true;
        this.$nextTick(() => {
          this.openStartImplement();
        });
        return;
      }

      clearTimeout(this.startBlurTimer);
      clearTimeout(this.endBlurTimer);

      if (this.startDisabled) {
        return;
      }

      this.rangeIndex = 0;
      this.opened = true;
      const start = this.$refs['start'];
      this.updateShowDate(this.value[0]);
      this.openDropdown(start);
    },
    handleStartFocus(e) {
      if (this.startDisabled) {
        return;
      }
      this.openStartImplement();

      this.$emit('focus', e, 'start');
    },
    handleStartClick() {
      if (this.startDisabled) {
        return;
      }
      this.openStartImplement();
    },
    openEndImplement: function() {
      if (!this.dropdownLoaded) {
        this.dropdownLoaded = true;
        this.$nextTick(() => {
          this.openEndImplement();
        });
        return;
      }

      clearTimeout(this.startBlurTimer);
      clearTimeout(this.endBlurTimer);

      if (this.endDisabled) {
        return;
      }
      this.rangeIndex = 1;
      this.opened = true;
      const end = this.$refs['end'];
      this.updateShowDate(this.value[1]);
      this.openDropdown(end);
    },
    handleEndFocus(e) {
      if (this.endDisabled) {
        return;
      }
      this.openEndImplement();

      this.$emit('focus', e, 'end');
    },
    handleEndClick() {
      if (this.endDisabled) {
        return;
      }
      this.openEndImplement();
    },
    handleInputBlur(e) {
      clearTimeout(this.blurTimer);

      this.blurTimer = setTimeout(() => {
        this.close();
      }, 200);

      this.$emit('blur', e);
    },
    handleStartBlur(e) {
      clearTimeout(this.startBlurTimer);

      this.startBlurTimer = setTimeout(() => {
        this.close();
      }, 200);
      this.$emit('blur', e, 'start');
    },
    handleEndBlur(e) {
      clearTimeout(this.endBlurTimer);

      this.endBlurTimer = setTimeout(() => {
        this.close();
      }, 200);
      this.$emit('blur', e, 'end');
    },
    openDropdown(inner) {
      document.addEventListener('click', this.handleOtherClick);
      this.$emit('open', this.rangeName);
      if (this.appendToBody) {
        const dropdown = this.$refs['dropdown'];
        dropdown.setPosition(inner);
      }
    },
    close() {
      if (!this.opened) {
        return;
      }

      this.opened = false;
      this.closeDropdown();
    },
    closeDropdown(notEmit) {
      document.removeEventListener('click', this.handleOtherClick);

      if (!notEmit) {
        this.$emit('close', this.rangeName);
      }
    },
    handleOtherClick(e) {
      const $datePicker = this.$refs['date-picker'];

      const target = e.target;
      const stopToggle = Utils.isParentsOrSelf(target, $datePicker);
      const stopDropdown = Utils.isParentsOrSelf(
        target,
        this.getDropdownInternalRef()
      );

      if (!(stopToggle || stopDropdown)) {
        this.opened = false;

        this.closeDropdown();
      } else {
        clearTimeout(this.blurTimer);
        clearTimeout(this.startBlurTimer);
        clearTimeout(this.endBlurTimer);
      }
    },
    dateFormat(date) {
      if (!date) {
        return '';
      }
      return dayjs(date).format(this.format);
    },
    dateToMoment(date) {
      if (!dayjs(date).isValid()) {
        return null;
      }
      return dayjs(date);
    },
    refreshDateList() {
      this.defaultEndTooltip = null;
      this.closeTooltip();
      const $months = this.$refs['month'];
      if (!$months) {
        return;
      }
      $months.forEach($month => {
        $month.refreshDateList();
      });
    },
    handleMomentSelect(dateMoment) {
      this.$emit('update', dateMoment.toDate());
      this.$emit('change', dateMoment.toDate());
      setTimeout(() => {
        this.close();
      }, 50);
    },
    handleRangeSelect(dateMoment) {
      const rangeIndex = this.rangeIndex;

      const oldStartDate = this.value[0];
      const oldEndDate = this.value[1];

      const dateRange = [oldStartDate, oldEndDate];
      dateRange[rangeIndex] = dateMoment.toDate();

      const newStartDate = dateRange[0];

      if (rangeIndex === 0 && oldEndDate) {
        if (dayjs(oldEndDate).isBefore(dayjs(newStartDate))) {
          dateRange[1] = new Date(newStartDate);
        }
      }

      this.$emit('update', dateRange);
      const rangeStart = newStartDate ? new Date(newStartDate) : null;
      const rangeEnd = dateRange[1] ? new Date(dateRange[1]) : null;

      this.$emit('change', [rangeStart, rangeEnd], this.rangeName);

      setTimeout(() => {
        if (rangeIndex === 0) {
          if (!this.endDisabled) {
            this.$refs['endInput'].focus();
          } else {
            this.close();
          }
        }

        if (rangeIndex === 1) {
          this.close();
        }
      }, 50);
    },
    updateShowDate(date) {
      if (!date) {
        return;
      }
      if (dayjs(date).isValid()) {
        this.panelMoment = Calendar.getFirstDateMomentOfMonth(date);
      }

      this.refreshDateList();
    },
    updateHoverDate(date) {
      this.hoverDate = date;
    },
    openTooltip(dom, text) {
      if (this.appendToBody) {
        const offset = Utils.getElementOffset(
          dom,
          this.getDropdownInternalRef()
        );
        this.tooltip.offset.left = `${offset.left}px`;
        this.tooltip.offset.top = `${offset.top + dom.clientHeight}px`;
      }

      this.tooltip.text = text;
      this.tooltip.visible = true;
    },
    closeTooltip() {
      this.tooltip.visible = false;
    },
    openDefaultTooltip() {
      const $month = this.$refs['month'];
      if (!$month) {
        return;
      }
      $month.forEach($month => {
        $month.openDefaultTooltip();
      });
    },
    tooltipStyle() {
      if (!this.appendToBody) {
        return {};
      }
      return this.tooltip.offset;
    },
    getDropdownInternalRef() {
      return this.$refs['dropdown'].getDropdownInternalRef();
    },
    handleDropdownMousedown() {
      setTimeout(() => {
        clearTimeout(this.blurTimer);
        clearTimeout(this.startBlurTimer);
        clearTimeout(this.endBlurTimer);
      }, 1);
    },
    focus(rangeName) {
      if (!this.isRange) {
        this.focusImplement(this.$refs['input']);
        return;
      }

      if (rangeName === 'start') {
        this.focusImplement(this.$refs['startInput']);
      } else if (rangeName === 'end') {
        this.focusImplement(this.$refs['endInput']);
      }
    },
    focusImplement($target) {
      $target.focus();
    },
    blur(rangeName) {
      if (!this.isRange) {
        this.blurImplement(this.$refs['input']);
        return;
      }

      if (rangeName === 'start') {
        this.blurImplement(this.$refs['startInput']);
      } else if (rangeName === 'end') {
        this.blurImplement(this.$refs['endInput']);
      }
    },
    blurImplement($target) {
      $target.blur();
    },
    open(rangeName) {
      if (!this.isRange) {
        this.openImplement();
        return;
      }

      if (rangeName === 'start') {
        this.openStartImplement();
      } else if (rangeName === 'end') {
        this.openEndImplement();
      }
    }
  },
  render() {
    const {
      $attrs,
      $listeners,
      appendToBody,
      datePickerClass,
      datePlaceholder,
      disabled,
      displayedDate,
      displayedRange,
      dropdownLoaded,
      endDisabled,
      endPlaceholder,
      handleDropdownMousedown,
      handleEndBlur,
      handleEndFocus,
      handleEndClick,
      handleInputBlur,
      handleInputClick,
      handleInputFocus,
      handleStartBlur,
      handleStartFocus,
      handleStartClick,
      isDisabled,
      isRange,
      novaHoliday,
      novaLocale,
      opened,
      dropdownClass,
      prefixedClass,
      showIcon,
      showMonthSize,
      showTooltip,
      startDisabled,
      startPlaceholder,
      tooltip,
      tooltipStyle
    } = this;

    const dateProps = {
      ref: 'inner',
      class: [
        `${prefixedClass}-inner`,
        {
          'is-disabled': isDisabled
        }
      ]
    };

    const dateIcon = showIcon ? (
      <span class={`${prefixedClass}-icon`}></span>
    ) : null;

    let dateNode;
    if (!isRange) {
      const dateInputProps = {
        ref: 'input',
        attrs: {
          disabled,
          placeholder: datePlaceholder,
          autocomplete: 'off',
          readonly: true,
          type: 'text'
        },
        domProps: {
          value: displayedDate
        },
        class: `${prefixedClass}-input`,
        on: {
          blur: handleInputBlur,
          click: handleInputClick,
          focus: handleInputFocus
        }
      };
      dateNode = (
        <div {...dateProps}>
          <input {...dateInputProps} />
          {dateIcon}
        </div>
      );
    }

    let rangeNode;
    if (isRange) {
      const startProps = {
        ref: 'start',
        class: [
          `${prefixedClass}-inner`,
          `${prefixedClass}-range-start`,
          {
            'is-disabled': startDisabled
          }
        ]
      };
      const startInputProps = {
        ref: 'startInput',
        attrs: {
          disabled: startDisabled,
          placeholder: startPlaceholder,
          autocomplete: 'off',
          readonly: true,
          type: 'text'
        },
        domProps: {
          value: displayedRange.start
        },
        class: `${prefixedClass}-input`,
        on: {
          blur: handleStartBlur,
          click: handleStartClick,
          focus: handleStartFocus
        }
      };
      const startNode = (
        <div {...startProps}>
          <input {...startInputProps} />
          {dateIcon}
        </div>
      );

      const endProps = {
        ref: 'end',
        class: [
          `${prefixedClass}-inner`,
          `${prefixedClass}-range-end`,
          {
            'is-disabled': endDisabled
          }
        ]
      };
      const endInputProps = {
        ref: 'endInput',
        attrs: {
          disabled: endDisabled,
          placeholder: endPlaceholder,
          autocomplete: 'off',
          readonly: true,
          type: 'text'
        },
        domProps: {
          value: displayedRange.end
        },
        class: `${prefixedClass}-input`,
        on: {
          blur: handleEndBlur,
          click: handleEndClick,
          focus: handleEndFocus
        }
      };
      const endNode = (
        <div {...endProps}>
          <input {...endInputProps} />
          {dateIcon}
        </div>
      );
      rangeNode = [startNode, endNode];
    }

    let dropdownNode;
    if (dropdownLoaded) {
      const dropdownProps = {
        ref: 'dropdown',
        props: {
          appendToBody,
          opened,
          dropdownClass: [`${prefixedClass}-dropdown`, dropdownClass]
        }
      };

      const monthsProps = {
        ref: 'months',
        class: `${prefixedClass}-months`,
        on: {
          mousedown: handleDropdownMousedown
        }
      };

      const monthList = Array(showMonthSize)
        .fill(null)
        .map((empty, index) => {
          const monthProps = {
            key: index,
            ref: 'month',
            refInFor: true,
            props: {
              novaHoliday,
              novaLocale,
              offset: index
            }
          };
          return <Month {...monthProps}></Month>;
        });
      const monthsNode = <div {...monthsProps}>{monthList}</div>;

      const tooltipProps = {
        class: `${prefixedClass}-tooltip`,
        style: tooltipStyle()
      };
      const tooltipNode = (
        <div {...tooltipProps} vShow={tooltip.visible && showTooltip}>
          {tooltip.text}
        </div>
      );
      dropdownNode = (
        <NovaDropdown {...dropdownProps}>
          {monthsNode}
          {tooltipNode}
        </NovaDropdown>
      );
    }

    const datePickerProps = {
      class: [prefixedClass, datePickerClass],
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      },
      ref: 'date-picker'
    };
    return (
      <div {...datePickerProps}>
        <div class={`${prefixedClass}-toggle`}>
          {dateNode}
          {rangeNode}
        </div>
        {dropdownNode}
      </div>
    );
  }
};
