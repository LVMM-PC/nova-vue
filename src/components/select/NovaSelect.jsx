import locale from '@/mixin/locale';
import Storage from '@/utils/storage';
import Utils from '@/utils/utils';
import NovaDropdown from '@/components/dropdown/NovaDropdown.jsx';

const POSITION = {
  BOTTOM: 'BOTTOM',
  TOP: 'TOP'
};

export default {
  name: 'NovaSelect',
  components: { NovaDropdown },
  mixins: [locale],
  provide() {
    return {
      NovaSelect: this
    };
  },
  model: {
    event: 'update'
  },
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-select`
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Boolean, Array],
      default: null
    },
    popoverClass: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dropdownLoaded: false,
      opened: false,
      multipleOptions: [],
      optionSerial: 0,
      activeIndex: -1
    };
  },
  computed: {
    classList() {
      const { disabled, opened, prefixedClass } = this;

      return [
        prefixedClass,
        {
          'is-open': opened,
          'is-disabled': disabled
        }
      ];
    },
    valueHash() {
      const hash = {};
      this.multipleOptions.forEach(option => {
        hash[option.value] = option;
      });
      return hash;
    }
  },
  destroyed() {
    this.closeDropdown(true);
  },
  methods: {
    hasValue() {
      const value = this.value;

      switch (typeof value) {
        case 'boolean':
          return true;
        case 'number':
          return true;
        case 'undefined':
          return false;
        case 'object':
          return null !== value;
        default:
          return !!value;
      }
    },
    getActiveOption() {
      if (this.activeIndex === -1) {
        return null;
      }
      return this.multipleOptions[this.activeIndex];
    },
    moveDown() {
      if (!this.opened) {
        this.handleInput();
        return;
      }

      let newActiveIndex = this.activeIndex;
      const multipleOptions = this.multipleOptions;
      const size = multipleOptions.length;
      for (let i = 0; i < size; i++) {
        newActiveIndex++;
        if (!multipleOptions[newActiveIndex]) {
          break;
        }
        if (multipleOptions[newActiveIndex].disabled) {
          continue;
        }
        break;
      }

      if (newActiveIndex >= size) {
        newActiveIndex = -1;
      }
      this.activeIndex = newActiveIndex;
      this.refreshItemScrollTop(newActiveIndex, POSITION.BOTTOM);
    },
    moveUp() {
      if (!this.opened) {
        this.handleInput();
        return;
      }

      let newActiveIndex = this.activeIndex;
      const multipleOptions = this.multipleOptions;
      const size = multipleOptions.length;
      for (let i = 0; i < size; i++) {
        newActiveIndex--;
        if (newActiveIndex < -1) {
          newActiveIndex = size - 1;
        }
        if (!multipleOptions[newActiveIndex]) {
          break;
        }
        if (multipleOptions[newActiveIndex].disabled) {
          continue;
        }
        break;
      }

      this.activeIndex = newActiveIndex;
      this.refreshItemScrollTop(newActiveIndex, POSITION.TOP);
    },
    handleInput() {
      if (this.opened) {
        return;
      }

      const $toggle = this.$refs['toggle'];
      this.handleToggleClick($toggle);
    },
    handleEnter() {
      if (!this.opened) {
        const $toggle = this.$refs['toggle'];
        this.handleToggleClick($toggle);
        return;
      }

      const activeOption = this.getActiveOption();

      const closeSingle = () => {
        if (!this.multiple) {
          this.close();
        }
      };

      if (!activeOption) {
        closeSingle();
        return;
      }

      this.setSelected(activeOption.value);
      closeSingle();
    },
    refreshItemScrollTop(index, position) {
      const component = this.getActiveOption()?.component;
      const $option = component?.$refs['option'];
      if (!$option) {
        return;
      }

      const $dropdown = this.getDropdownDom();

      const scrollTop = $dropdown.scrollTop;
      const listHeight = $dropdown.clientHeight;

      const offsetTop = $option.offsetTop;
      const itemHeight = $option.clientHeight;

      const underTop = offsetTop >= scrollTop;
      const aboveBottom = offsetTop <= scrollTop + listHeight - itemHeight;

      if (!(underTop && aboveBottom)) {
        if (position === POSITION.BOTTOM) {
          $dropdown.scrollTo(0, offsetTop - listHeight + itemHeight);
        }
        if (position === POSITION.TOP) {
          $dropdown.scrollTo(0, offsetTop);
        }
      }
    },
    displayedLabel() {
      const value = this.value;
      if (this.hasValue(value)) {
        return this.valueToLabel(value);
      }
      return value;
    },
    getPlaceholder() {
      if (this.placeholder) {
        return this.placeholder;
      }
      if (this.novaLocale.select.placeholder) {
        return this.novaLocale.select.placeholder;
      }
    },
    valueToLabel(value) {
      const found = this.valueHash[value];
      if (found !== null && found !== undefined) {
        return found.label;
      }
      return '';
    },
    setSelected(value) {
      if (this.multiple) {
        const newValue = this.value.slice();
        const foundIndex = newValue.findIndex(v => {
          return v === value;
        });
        if (foundIndex !== -1) {
          newValue.splice(foundIndex, 1);
        } else {
          newValue.push(value);
        }

        this.$emit('update', newValue);
        this.$emit('change', newValue);
      } else {
        if (this.value !== value) {
          this.$emit('update', value);
          this.$emit('change', value);
        }
      }

      this.$refs['select'].focus();
    },
    getSingleSelectedIndex() {
      return this.multipleOptions.findIndex(option => {
        return option.value === this.value;
      });
    },
    getValue() {
      return this.value;
    },
    close() {
      this.opened = false;
      this.closeDropdown();
    },
    handleToggleClick(target) {
      const { prefixedClass } = this;

      if (!this.dropdownLoaded) {
        this.dropdownLoaded = true;
        this.$nextTick(() => {
          this.handleToggleClick(target);
        });
        return;
      }

      if (this.disabled) {
        return;
      }

      const isDelete = Utils.hasClassName(
        target,
        `${prefixedClass}-label-delete`
      );
      if (isDelete) {
        return;
      }

      this.opened = !this.opened;
      if (this.opened) {
        this.openDropdown();
      } else {
        this.closeDropdown();
      }
    },
    openDropdown() {
      document.addEventListener('click', this.handleOtherClick);
      this.$emit('open');

      if (!this.multiple) {
        this.activeIndex = this.getSingleSelectedIndex();
      } else {
        this.activeIndex = -1;
      }

      this.refreshDropdown();
    },
    refreshDropdown() {
      if (this.appendToBody) {
        const select = this.$refs['select'];
        const dropdown = this.$refs['dropdown'];
        dropdown.setPosition(select);
      }
    },
    handleTransitionFinished() {
      this.refreshDropdown();
    },
    closeDropdown(notEmit) {
      document.removeEventListener('click', this.handleOtherClick);

      if (!notEmit) {
        this.$emit('close');
      }
    },
    handleOtherClick(e) {
      const $select = this.$refs['select'];
      const stopToggle = Utils.isParentsOrSelf(e.target, $select);
      const stopDropdown = Utils.isParentsOrSelf(
        e.target,
        this.getDropdownDom()
      );

      if (!(stopToggle || stopDropdown)) {
        this.opened = false;

        this.closeDropdown();
      }
    },
    addMultipleOption(option) {
      const optionSerial = this.optionSerial;

      this.multipleOptions.push(
        Object.assign({ optionId: optionSerial }, option)
      );

      this.optionSerial++;
      return optionSerial;
    },
    removeMultipleOption(optionId) {
      this.multipleOptions = this.multipleOptions.filter(option => {
        return option.optionId !== optionId;
      });
    },
    handleDeleteClick(value) {
      if (this.disabled) {
        return;
      }

      this.setSelected(value);
    },
    getDropdownDom() {
      return this.$refs['dropdown'].getDom();
    },
    handleKeydown(e) {
      switch (e.key) {
        case 'Down': // IE/Edge
        case 'ArrowDown':
          e.preventDefault();
          this.moveDown();
          break;
        case 'Up': // IE/Edge
        case 'ArrowUp':
          e.preventDefault();
          this.moveUp();
          break;
        case 'Spacebar': // IE/Edge
        case ' ':
          this.handleEnter();
          e.preventDefault();
          break;
        case 'Enter':
          this.handleEnter();
          e.preventDefault();
          break;
        case 'Tab':
          this.close();
          break;
        case 'Esc': // IE/Edge
        case 'Escape':
          this.close();
          break;
        default:
          this.handleInput();
      }
    }
  },
  render() {
    const {
      $attrs,
      $listeners,
      $slots,
      appendToBody,
      classList,
      disabled,
      displayedLabel,
      dropdownLoaded,
      getPlaceholder,
      handleDeleteClick,
      handleKeydown,
      handleToggleClick,
      handleTransitionFinished,
      hasValue,
      multiple,
      opened,
      popoverClass,
      prefixedClass,
      value,
      valueToLabel
    } = this;

    const selectProps = {
      class: classList,
      attrs: {
        ...$attrs,
        tabindex: !disabled ? 0 : -1
      },
      on: {
        ...$listeners,
        keydown: handleKeydown
      },
      ref: 'select'
    };

    const dropdownProps = {
      props: {
        opened,
        appendToBody: appendToBody && dropdownLoaded,
        popoverClass: [
          `${prefixedClass}-dropdown`,
          { [`${prefixedClass}-multiple-dropdown`]: multiple },
          popoverClass
        ]
      },
      ref: 'dropdown'
    };

    const children = $slots.default;

    let singleNode;

    const textClassName = `${prefixedClass}-text`;
    const placeholderClassList = [
      textClassName,
      `${prefixedClass}-placeholder`
    ];

    if (multiple === false) {
      let placeholderNode;
      let textNode;
      if (!hasValue()) {
        placeholderNode = (
          <span class={placeholderClassList}>{getPlaceholder()}</span>
        );
      } else {
        textNode = (
          <span class={textClassName}>
            {displayedLabel() || value?.toString()}
          </span>
        );
      }

      singleNode = [placeholderNode, textNode];
    }

    let multipleNode;
    if (multiple === true && value) {
      let placeholderNode;
      let textNode;

      if (!value.length) {
        placeholderNode = (
          <span class={placeholderClassList}>{getPlaceholder()}</span>
        );
      }

      const labelList = value.map(v => {
        const labelClassList = [
          `${prefixedClass}-label-delete`,
          { 'is-disabled': disabled }
        ];

        return (
          <span class={`${prefixedClass}-label`} key={v}>
            <span>{valueToLabel(v) || v}</span>
            <span
              class={labelClassList}
              onClick={() => {
                handleDeleteClick(v);
              }}
            ></span>
          </span>
        );
      });

      textNode = (
        <div class={`${prefixedClass}-labels`}>
          <transition-group
            name={`${Storage.prefix}-zoom`}
            onAfterLeave={handleTransitionFinished}
            onEnter={handleTransitionFinished}
          >
            {labelList}
          </transition-group>
        </div>
      );

      multipleNode = [placeholderNode, textNode];
    }

    return (
      <div {...selectProps}>
        <div
          class={`${prefixedClass}-toggle`}
          onClick={e => {
            handleToggleClick(e.target);
          }}
          ref="toggle"
        >
          <span class={`${prefixedClass}-arrow`}></span>
          <ClientOnly>
            {singleNode}
            {multipleNode}
          </ClientOnly>
        </div>
        <NovaDropdown {...dropdownProps}>{children}</NovaDropdown>
      </div>
    );
  }
};
