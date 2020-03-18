import locale from '@/mixin/locale';
import Storage from '@/utils/storage';
import Utils from '@/utils/utils';
import NovaDropdown from '@/components/dropdown/NovaDropdown.jsx';
import OptionTree from '@/components/select/OptionTree';

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
      return this.getOptionOfIndex(this.activeIndex);
    },
    getOptionsFromChildren(children, options = []) {
      if (!children) {
        return;
      }

      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.componentOptions?.Ctor?.options?.isSelectOption) {
          options.push(child);
        } else {
          this.getOptionsFromChildren(
            child.componentOptions?.children,
            options
          );
        }
      }
      return options;
    },
    getOptions() {
      const children = this.$slots.default;
      return this.getOptionsFromChildren(children);
    },
    getOptionTreeFromChildren(children, tree = []) {
      if (!children) {
        return;
      }

      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (child.componentOptions?.Ctor?.options?.isSelectOptGroup) {
          tree.push({
            isOptGroup: true,
            children: this.getOptionTreeFromChildren(
              child.componentOptions?.children
            ),
            VNode: child
          });
        } else if (child.componentOptions?.Ctor?.options?.isSelectOption) {
          tree.push({
            isOption: true,
            VNode: child
          });
        } else {
          this.getOptionTreeFromChildren(
            child.componentOptions?.children,
            tree
          );
        }
      }

      return tree;
    },
    getOptionTree() {
      const children = this.$slots.default;
      return this.getOptionTreeFromChildren(children);
    },
    getOptionOfIndex(index) {
      const options = this.getOptions();
      return options[index];
    },
    getIndexOfValue(value) {
      const options = this.getOptions();
      return options.findIndex(option => {
        return option?.componentOptions?.propsData?.value === value;
      });
    },
    setActiveIndex(index) {
      this.activeIndex = index;
    },
    moveDown() {
      if (!this.opened) {
        this.handleInput();
        return;
      }

      let newActiveIndex = this.activeIndex;
      const options = this.getOptions();
      const size = options.length;

      newActiveIndex++;
      for (let i = 0; i < size; i++) {
        if (!this.getOptionOfIndex(newActiveIndex)) {
          break;
        }
        if (this.getOptionOfIndex(newActiveIndex).disabled) {
          newActiveIndex++;
          continue;
        }
        break;
      }

      if (newActiveIndex >= size) {
        newActiveIndex = -1;
      }
      this.activeIndex = newActiveIndex;
      this.refreshScroll(newActiveIndex, POSITION.BOTTOM);
    },
    moveUp() {
      if (!this.opened) {
        this.handleInput();
        return;
      }

      let newActiveIndex = this.activeIndex;
      const options = this.getOptions();
      const size = options.length;

      newActiveIndex--;
      for (let i = 0; i < size; i++) {
        if (newActiveIndex < -1) {
          newActiveIndex = size - 1;
        }
        if (!this.getOptionOfIndex(newActiveIndex)) {
          break;
        }
        if (this.getOptionOfIndex(newActiveIndex).disabled) {
          newActiveIndex--;
          continue;
        }
        break;
      }

      this.activeIndex = newActiveIndex;
      this.refreshScroll(newActiveIndex, POSITION.TOP);
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

      this.setSelected(activeOption?.componentOptions?.propsData?.value);
      closeSingle();
    },
    refreshScrollImplement: function(index, position) {
      const $optionTree = this.$refs['optionTree'];
      const $option = $optionTree.getOptionDomOfIndex(index);

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
    refreshScroll(index, position) {
      setTimeout(() => {
        this.refreshScrollImplement(index, position);
      }, 0);
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
      return this.getIndexOfValue(this.value);
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
        const singleSelectedIndex = this.getSingleSelectedIndex();
        this.activeIndex = singleSelectedIndex;

        this.refreshScroll(singleSelectedIndex, POSITION.TOP);
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
      if (this.disabled) {
        return;
      }

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
          e.preventDefault();
          this.handleEnter();
          break;
        case 'Enter':
          e.preventDefault();
          this.handleEnter();
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

    let optionTreeNode;
    if (dropdownLoaded) {
      optionTreeNode = <OptionTree ref="optionTree"></OptionTree>;
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
        <NovaDropdown {...dropdownProps}>{optionTreeNode}</NovaDropdown>
        {children}
      </div>
    );
  }
};
