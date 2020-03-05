<template>
  <div
    class="nova-date-picker"
    :class="datePickerClass"
    v-bind="$attrs"
    v-on="$listeners"
    ref="date-picker"
  >
    <div class="nova-date-picker-toggle" v-if="!isRange">
      <div
        class="nova-date-picker-inner"
        :class="{ 'is-disabled': isDisabled }"
        ref="inner"
      >
        <input
          autocomplete="off"
          class="nova-date-picker-input"
          type="text"
          :value="displayedDate"
          readonly
          :disabled="disabled"
          :placeholder="placeholder"
          @focus="handleInputFocus"
          @blur="handleInputBlur"
          ref="input"
        />
        <span
          class="nova-date-picker-overlay nova-date-picker-prefix"
          v-if="showPrefix"
        >
          <slot name="prefix"></slot>
        </span>
        <span
          class="nova-date-picker-overlay nova-date-picker-suffix"
          v-if="showSuffix"
        >
          <slot name="suffix">
            {{ getSuffixText(value) }}
          </slot>
        </span>
        <span class="nova-date-picker-icon" v-if="showIcon"></span>
      </div>
    </div>
    <div class="nova-date-picker-toggle" v-if="isRange">
      <div
        class="nova-date-picker-inner nova-date-picker-range-start"
        :class="{
          'nova-date-picker-inner-fake-disabled': startFakeDisabled,
          'is-disabled': startDisabled
        }"
        ref="start"
      >
        <input
          autocomplete="off"
          class="nova-date-picker-input"
          type="text"
          :value="displayedRange.start"
          readonly
          :disabled="startDisabled"
          :placeholder="getStartPlaceholder"
          v-if="!startFakeDisabled"
          @focus="handleStartFocus"
          @blur="handleStartBlur"
          @click="handleStartClick"
          ref="startInput"
        />
        <input
          autocomplete="off"
          class="nova-date-picker-input"
          readonly
          @focus="handleStartFocus"
          @blur="handleStartBlur"
          @click="handleStartClick"
          v-if="startFakeDisabled"
          :placeholder="getStartPlaceholder"
        />
        <span
          class="nova-date-picker-overlay nova-date-picker-prefix"
          v-if="showPrefix"
        >
          <slot range="start" name="prefix"></slot>
        </span>
        <span
          class="nova-date-picker-overlay nova-date-picker-suffix"
          v-if="showSuffix"
        >
          <slot range="start" name="suffix">
            {{ getSuffixText(value[0]) }}
          </slot>
        </span>
        <span class="nova-date-picker-icon" v-if="showIcon"></span>
      </div>
      <div
        class="nova-date-picker-inner nova-date-picker-range-end"
        :class="{
          'nova-date-picker-inner-fake-disabled': endFakeDisabled,
          'is-disabled': endDisabled
        }"
        ref="end"
      >
        <input
          autocomplete="off"
          class="nova-date-picker-input"
          type="text"
          :value="displayedRange.end"
          readonly
          :disabled="endDisabled"
          :placeholder="getEndPlaceholder"
          v-if="!endFakeDisabled"
          @focus="handleEndFocus"
          @blur="handleEndBlur"
          @click="handleEndClick"
          ref="endInput"
        />
        <input
          autocomplete="off"
          class="nova-date-picker-input nova-date-picker-input-fake-disabled"
          readonly
          @focus="handleEndFocus"
          @blur="handleEndBlur"
          @click="handleEndClick"
          v-if="endFakeDisabled"
          :placeholder="getEndPlaceholder"
        />
        <span
          class="nova-date-picker-overlay nova-date-picker-prefix"
          v-if="showPrefix"
        >
          <slot range="end" name="prefix"></slot>
        </span>
        <span
          class="nova-date-picker-overlay nova-date-picker-suffix"
          v-if="showSuffix"
        >
          <slot range="end" name="suffix">
            {{ getSuffixText(value[1]) }}
          </slot>
        </span>
        <span class="nova-date-picker-icon" v-if="showIcon"></span>
      </div>
    </div>
    <NovaDropdown
      ref="dropdown"
      :opened="opened"
      :append-to-body="appendToBody"
      :popover-class="['nova-date-picker-dropdown', popoverClass]"
    >
      <div
        class="nova-date-picker-months"
        ref="months"
        @mousedown="handleDropdownMousedown"
      >
        <Month
          ref="monthRef"
          v-for="(month, monthIndex) in showMonthSize"
          :offset="monthIndex"
          :key="monthIndex"
          :nova-locale="novaLocale"
          :nova-holiday="novaHoliday"
        ></Month>
      </div>
      <div
        class="nova-date-picker-tooltip"
        v-show="tooltip.visible && showTooltip"
        :style="tooltipStyle()"
      >
        {{ tooltip.text }}
      </div>
    </NovaDropdown>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import Utils from '@/utils/utils';
import Calendar from '@/utils/calendar';
import locale from '@/mixin/locale';
import NovaDropdown from '@/components/dropdown/NovaDropdown';
import Month from './Month';

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
    value: {},
    placeholder: {
      type: String,
      default: ''
    },
    startPlaceholder: {
      type: String
    },
    endPlaceholder: {
      type: String
    },
    format: {
      type: String,
      default: Calendar.defaultFormat
    },
    disabled: {
      type: [Boolean, Array],
      default: false
    },
    startFakeDisabled: {
      type: Boolean,
      default: false
    },
    endFakeDisabled: {
      type: Boolean,
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
      type: Number
    },
    showPrefix: {
      type: Boolean,
      default: false
    },
    showIcon: {
      type: Boolean,
      default: true
    },
    showSuffix: {
      type: Boolean,
      default: false
    },
    showTooltip: {
      type: Boolean,
      default: true
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
      paneMoment: first,
      opened: false,
      rangeCurrentPane: 0,
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
    displayedDate() {
      let date = this.value;

      return this.dateFormat(date);
    },
    displayedRange() {
      let startDate = this.value[0];
      let endDate = this.value[1];
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
    getStartPlaceholder() {
      let startPlaceholder = this.startPlaceholder;
      if (startPlaceholder === undefined) {
        startPlaceholder = this.placeholder;
      }
      return startPlaceholder;
    },
    getEndPlaceholder() {
      let endPlaceholder = this.endPlaceholder;
      if (endPlaceholder === undefined) {
        endPlaceholder = this.placeholder;
      }
      return endPlaceholder;
    }
  },
  mounted() {
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
      clearTimeout(this.blurTimer);

      if (this.disabled) {
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
    openStartImplement: function() {
      clearTimeout(this.startBlurTimer);
      clearTimeout(this.endBlurTimer);

      if (this.startDisabled) {
        return;
      }

      this.rangeCurrentPane = 0;
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

      this.$emit('startFocus', e);
      this.$emit('focus', e);
    },
    handleStartClick(e) {
      this.$emit('startClick', e);
    },
    openEndImplement: function() {
      clearTimeout(this.startBlurTimer);
      clearTimeout(this.endBlurTimer);

      if (this.endDisabled) {
        return;
      }
      this.rangeCurrentPane = 1;
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

      this.$emit('endFocus', e);
      this.$emit('focus', e);
    },
    handleEndClick(e) {
      this.$emit('endClick', e);
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
      this.$emit('startBlur', e);
      this.$emit('blur', e);
    },
    handleEndBlur(e) {
      clearTimeout(this.endBlurTimer);

      this.endBlurTimer = setTimeout(() => {
        this.close();
      }, 200);
      this.$emit('endBlur', e);
      this.$emit('blur', e);
    },
    openDropdown(inner) {
      document.addEventListener('click', this.handleOtherClick);
      this.$emit('open');
      if (this.appendToBody) {
        let dropdown = this.$refs['dropdown'];
        dropdown.setPosition(inner);
      }
    },
    close() {
      this.opened = false;
      this.closeDropdown();
    },
    closeDropdown() {
      document.removeEventListener('click', this.handleOtherClick);
      this.$emit('close');
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
      let rangeCurrentPane = this.rangeCurrentPane;

      let oldStartDate = this.value[0];
      let oldEndDate = this.value[1];

      let dateRange = [oldStartDate, oldEndDate];
      dateRange[rangeCurrentPane] = dateMoment.toDate();

      let newStartDate = dateRange[0];

      if (rangeCurrentPane === 0 && oldEndDate) {
        if (dayjs(oldEndDate).isBefore(dayjs(newStartDate))) {
          dateRange[1] = new Date(newStartDate);
        }
      }

      this.$emit('update', dateRange);
      let rangeStart = newStartDate ? new Date(newStartDate) : null;
      let rangeEnd = dateRange[1] ? new Date(dateRange[1]) : null;

      this.$emit('change', [rangeStart, rangeEnd]);
      if (rangeCurrentPane === 0) {
        this.$emit('startChange', rangeStart);
      } else if (rangeCurrentPane === 1) {
        this.$emit('endChange', rangeEnd);
      }

      setTimeout(() => {
        if (rangeCurrentPane === 0) {
          if (!this.endFakeDisabled) {
            this.$refs['endInput'].focus();
          } else {
            this.close();
          }
        }

        if (rangeCurrentPane === 1) {
          this.close();
        }
      }, 50);
    },
    updateShowDate(date) {
      if (!date) {
        return;
      }
      if (dayjs(date).isValid()) {
        this.paneMoment = Calendar.getFirstDateMomentOfMonth(date);
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
    focus() {
      let $input = this.$refs['input'];
      $input.focus();
    },
    focusStart() {
      let $input = this.$refs['startInput'];
      $input.focus();
    },
    focusEnd() {
      let $input = this.$refs['endInput'];
      $input.focus();
    },
    blur() {
      let $input = this.$refs['input'];
      $input.blur();
    },
    blurStart() {
      let $input = this.$refs['startInput'];
      $input.blur();
    },
    blurEnd() {
      let $input = this.$refs['endInput'];
      $input.blur();
    },
    open() {
      this.openImplement();
    },
    openStart() {
      this.openStartImplement();
    },
    openEnd() {
      this.openEndImplement();
    }
  }
};
</script>

<style lang="less">
@import '../../styles/var';

@date-picket: @{prefixed}-date-picker;

.@{date-picket} {
  vertical-align: top;
  display: inline-block;
  font-size: 14px;
  line-height: 20px;
  font-family: @font-family;
  color: @font-color;
}

.@{date-picket}-toggle {
  box-sizing: border-box;
  width: 200px;
}

.@{date-picket}-inner {
  display: block;
  box-sizing: border-box;
  height: 30px;

  ::placeholder {
    color: @placeholder-color;
  }

  &.is-disabled {
    opacity: 0.5;
  }

  &.@{date-picket}-inner-fake-disabled {
    .@{date-picket}-input {
      background-color: #eeeeee;
      color: @placeholder-color;
    }

    .@{date-picket}-suffix {
      display: none;
    }
  }
}

.@{date-picket}-input {
  line-height: 18px;
  box-sizing: border-box;
  border: 1px solid #ccc;
  width: 100%;
  height: 100%;
  padding: 5px;
  outline: none;
  cursor: default;
  color: @font-color;

  &[disabled] {
    background-color: #eeeeee;
  }
}

.@{date-picket}-overlay {
  color: #999;
  margin-right: 30px;
  display: block;
  margin-top: -30px;
  position: relative;
  pointer-events: none;
}

.@{date-picket}-prefix,
.@{date-picket}-suffix {
  padding: 5px;
  vertical-align: top;
  display: inline-block;
}

.@{date-picket}-prefix {
  float: left;
}

.@{date-picket}-suffix {
  float: right;
}

.@{date-picket}-icon {
  float: right;
  margin-top: -30px;
  position: relative;
  width: 30px;
  height: 30px;
  vertical-align: top;
  display: inline-block;
  pointer-events: none;

  &:before {
    content: '';
    display: block;
    width: 24px;
    height: 24px;
    margin: 3px;
    background-image: url(../../assets/icons/icon-calendar.svg);
  }
}

.@{date-picket}-months {
  white-space: nowrap;
}

.@{date-picket}-tooltip {
  position: absolute;
  color: #666666;
  border: 1px solid #cccccc;
  padding: 5px 10px;
  pointer-events: none;
  background-color: #fff;
  line-height: 20px;
  text-align: center;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
  white-space: nowrap;
  margin-top: 10px;
  margin-left: 15px;
  transform: translate(-50%, 0);

  &:before,
  &:after {
    width: 0;
    height: 0;
    border-style: solid;
    content: '';
    display: block;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }

  &:before {
    top: -7px;
    border-width: 0 7px 7px 7px;
    border-color: transparent transparent #cccccc transparent;
  }

  &:after {
    top: -5.5px;
    border-width: 0 6px 6px 6px;
    border-color: transparent transparent #ffffff transparent;
  }
}
</style>
