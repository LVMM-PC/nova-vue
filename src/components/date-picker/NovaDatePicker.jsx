import dayjs from 'dayjs';
import Utils from '@/utils/utils';
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
    popoverClass: {
      type: String,
      default: null
    }
  },
  data() {
    let first = Calendar.getFirstDateMomentOfMonth(dayjs());
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
      return {
        'is-open': this.opened,
        'nova-date-picker-range': this.isRange
      };
    },
    isDisabled() {
      let disabled = this.disabled;
      let isArray = Array.isArray(disabled);
      if (!isArray) {
        return disabled;
      }
      return false;
    },
    startDisabled() {
      let disabled = this.disabled;
      let isArray = Array.isArray(disabled);
      if (!isArray) {
        return disabled;
      }
      return disabled[0];
    },
    endDisabled() {
      let disabled = this.disabled;
      let isArray = Array.isArray(disabled);
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
      let date = this.value;

      return this.dateFormat(date);
    },
    displayedRange() {
      const value = this.value;
      if (!value) {
        return;
      }
      let startDate = value[0];
      let endDate = value[1];
      let startText = this.dateFormat(startDate);
      let endText = this.dateFormat(endDate);
      return {
        start: startText,
        end: endText
      };
    },
    valueMoment() {
      let date = this.value;
      if (this.isRange) {
        return [this.dateToMoment(date[0]), this.dateToMoment(date[1])];
      } else {
        return this.dateToMoment(date);
      }
    },
    datePlaceholder() {
      let novaLocale = this.novaLocale;

      let placeholder = this.placeholder;
      if (placeholder === undefined) {
        return novaLocale.datePicker.placeholder;
      }
      return placeholder;
    },
    startPlaceholder() {
      let novaLocale = this.novaLocale;

      let placeholder = this.placeholder;
      if (
        placeholder === undefined ||
        (placeholder && placeholder[0] === undefined)
      ) {
        return novaLocale.datePicker.rangePlaceholder[0];
      }

      let isArray = Array.isArray(placeholder);
      if (isArray) {
        return placeholder[0];
      }
      return placeholder;
    },
    endPlaceholder() {
      let novaLocale = this.novaLocale;

      let placeholder = this.placeholder;
      if (
        placeholder === undefined ||
        (placeholder && placeholder[1] === undefined)
      ) {
        return novaLocale.datePicker.rangePlaceholder[1];
      }

      let isArray = Array.isArray(placeholder);
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
    this.closeDropdown();
  },
  methods: {
    init() {
      this.refreshDateList();
    },
    isToday(dateMoment) {
      let now = dayjs();
      return dateMoment.isSame(now, 'date');
    },
    getSpecialText(dateMoment) {
      let ymd = dateMoment.format(Calendar.defaultFormat);

      let holiday = this.novaHoliday;
      if (holiday) {
        let holidayDetail = holiday[ymd];
        if (holidayDetail && holidayDetail.isMain) {
          return holidayDetail.shortTitle;
        }
      }

      return null;
    },
    getWeekTitle(date) {
      let novaLocale = this.novaLocale;
      if (!date) {
        return;
      }
      let day = dayjs(date).day();
      return novaLocale.datePicker.weeksLong[this.weeks[day]];
    },
    getSuffixText(date) {
      let dateMoment = dayjs(date);
      let specialText = this.getSpecialText(dateMoment);
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
      let inner = this.$refs['inner'];
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
      let start = this.$refs['start'];
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
      let end = this.$refs['end'];
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
        let dropdown = this.$refs['dropdown'];
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
    closeDropdown() {
      document.removeEventListener('click', this.handleOtherClick);
      this.$emit('close', this.rangeName);
    },
    handleOtherClick(e) {
      let $datePicker = this.$refs['date-picker'];

      let target = e.target;
      let stopToggle = Utils.isParentsOrSelf(target, $datePicker);
      let stopDropdown = Utils.isParentsOrSelf(target, this.getDropdownDom());

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
      let monthRef = this.$refs['monthRef'];
      if (!monthRef) {
        return;
      }
      monthRef.forEach($month => {
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
      let rangeIndex = this.rangeIndex;

      let oldStartDate = this.value[0];
      let oldEndDate = this.value[1];

      let dateRange = [oldStartDate, oldEndDate];
      dateRange[rangeIndex] = dateMoment.toDate();

      let newStartDate = dateRange[0];

      if (rangeIndex === 0 && oldEndDate) {
        if (dayjs(oldEndDate).isBefore(dayjs(newStartDate))) {
          dateRange[1] = new Date(newStartDate);
        }
      }

      this.$emit('update', dateRange);
      let rangeStart = newStartDate ? new Date(newStartDate) : null;
      let rangeEnd = dateRange[1] ? new Date(dateRange[1]) : null;

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
        let offset = Utils.getElementOffset(dom, this.getDropdownDom());
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
      let monthRef = this.$refs['monthRef'];
      if (!monthRef) {
        return;
      }
      monthRef.forEach($month => {
        $month.openDefaultTooltip();
      });
    },
    tooltipStyle() {
      if (!this.appendToBody) {
        return {};
      }
      return this.tooltip.offset;
    },
    getDropdownDom() {
      return this.$refs['dropdown'].getDom();
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
    let {
      $attrs,
      $listeners,
      datePickerClass,
      isDisabled,
      showIcon,
      disabled,
      datePlaceholder,
      displayedDate,
      handleInputBlur,
      handleInputClick,
      handleInputFocus,
      isRange,
      startDisabled,
      endDisabled,
      startPlaceholder,
      displayedRange,
      handleStartBlur,
      handleStartFocus,
      endPlaceholder,
      handleEndBlur,
      handleEndFocus,
      dropdownLoaded,
      appendToBody,
      opened,
      popoverClass,
      handleDropdownMousedown,
      showMonthSize,
      novaHoliday,
      novaLocale,
      tooltip,
      showTooltip,
      tooltipStyle
    } = this;

    let dateProps = {
      ref: 'inner',
      class: [
        `nova-date-picker-inner`,
        {
          'is-disabled': isDisabled
        }
      ]
    };

    const dateIcon = showIcon ? (
      <span class={`nova-date-picker-icon`}></span>
    ) : null;

    let dateNode;

    if (!isRange) {
      const dateInputProps = {
        ref: 'input',
        attrs: {
          disabled: disabled,
          placeholder: datePlaceholder,
          autocomplete: 'off',
          readonly: true,
          type: 'text'
        },
        domProps: {
          value: displayedDate
        },
        class: `nova-date-picker-input`,
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
          `nova-date-picker-inner`,
          `nova-date-picker-range-start`,
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
          value: displayedRange.start,
          autocomplete: 'off',
          readonly: true,
          type: 'text'
        },
        class: `nova-date-picker-input`,
        on: {
          blur: handleStartBlur,
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
          `nova-date-picker-inner`,
          `nova-date-picker-range-end`,
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
          value: displayedRange.start,
          autocomplete: 'off',
          readonly: true,
          type: 'text'
        },
        class: `nova-date-picker-input`,
        on: {
          blur: handleEndBlur,
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
      let dropdownProps = {
        ref: 'dropdown',
        props: {
          appendToBody: appendToBody,
          opened: opened,
          popoverClass: [`nova-date-picker-dropdown`, popoverClass]
        }
      };

      let monthsProps = {
        ref: 'months',
        class: `nova-date-picker-months`,
        on: {
          mousedown: handleDropdownMousedown
        }
      };

      let monthList = Array(showMonthSize)
        .fill(null)
        .map((empty, index) => {
          let monthProps = {
            key: index,
            ref: 'monthRef',
            refInFor: true,
            props: {
              novaHoliday: novaHoliday,
              novaLocale: novaLocale,
              offset: index
            }
          };
          return <Month {...monthProps}></Month>;
        });
      let monthsNode = <div {...monthsProps}>{monthList}</div>;

      let tooltipProps = {
        class: `nova-date-picker-tooltip`,
        style: tooltipStyle()
      };
      let tooltipNode = (
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

    let datePickerProps = {
      class: [`nova-date-picker`, datePickerClass],
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
        <div class={`nova-date-picker-toggle`}>
          {dateNode}
          {rangeNode}
        </div>
        {dropdownNode}
      </div>
    );
  }
};
