import Storage from '@/utils/storage';
import Utils from '@/utils/utils';
import Props from '@/utils/props';
import locale from '@/mixin/locale';
import NovaDropdown from '@/components/dropdown/NovaDropdown.jsx';
import OptionTree from './OptionTree.jsx';

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
    dropdownClass: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dropdownLoaded: false,
      opened: false,
      allOptions: [],
      activeIndex: -1,
      width: null
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
    }
  },
  beforeDestroy() {
    this.closeDropdown(true);
  },
  methods: {
    reload() {
      if (this.dropdownLoaded) {
        this.dropdownLoaded = false;

        this.$nextTick(() => {
          this.dropdownLoaded = true;
        });
      }
    },
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
    getActiveOptionVNode() {
      if (this.activeIndex === -1) {
        return null;
      }
      return this.getOptionVNodeFromIndex(this.activeIndex);
    },
    getOptionVNodesFromChildren(children, options = []) {
      if (!children) {
        return;
      }

      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (Props.getVNodeOptions(child)?.isSelectOption) {
          options.push(child);
        } else {
          this.getOptionVNodesFromChildren(
            child.componentOptions?.children,
            options
          );
        }
      }
      return options;
    },
    getOptionVNodes() {
      const children = this.$slots.default;
      return this.getOptionVNodesFromChildren(children);
    },
    getOptionVNodeTreeFromChildren(children, tree = []) {
      if (!children) {
        return;
      }

      for (let i = 0; i < children.length; i++) {
        let child = children[i];
        if (Props.getVNodeOptions(child)?.isSelectOptGroup) {
          tree.push({
            isOptGroup: true,
            children: this.getOptionVNodeTreeFromChildren(
              child.componentOptions?.children
            ),
            vNode: child
          });
        } else if (Props.getVNodeOptions(child)?.isSelectOption) {
          tree.push({
            isOption: true,
            vNode: child
          });
        } else {
          this.getOptionVNodeTreeFromChildren(
            child.componentOptions?.children,
            tree
          );
        }
      }

      return tree;
    },
    getOptionVNodeTree() {
      const children = this.$slots.default;
      return this.getOptionVNodeTreeFromChildren(children);
    },
    getOptionVNodeFromIndex(index) {
      const options = this.getOptionVNodes();
      return options[index];
    },
    getOptionVNodeIndexFromValue(value) {
      const options = this.getOptionVNodes();
      if (!options) {
        return;
      }
      return options.findIndex(option => {
        return Props.getVNodeProps(option)?.value === value;
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

      let nextIndex = this.activeIndex;
      const options = this.getOptionVNodes();
      const size = options.length;

      nextIndex++;
      for (let i = 0; i < size; i++) {
        const option = options[nextIndex];

        if (!option) {
          break;
        }

        const propsData = Props.getVNodeProps(option);

        if (Props.booleanStandardize(propsData?.disabled)) {
          nextIndex++;
          continue;
        }

        break;
      }

      if (nextIndex >= size) {
        nextIndex = -1;
      }
      this.activeIndex = nextIndex;
      this.refreshScroll(nextIndex, POSITION.BOTTOM);
    },
    moveUp() {
      if (!this.opened) {
        this.handleInput();
        return;
      }

      let prevIndex = this.activeIndex;
      const options = this.getOptionVNodes();
      const size = options.length;

      prevIndex--;
      for (let i = 0; i < size; i++) {
        if (prevIndex < -1) {
          prevIndex = size - 1;
        }

        if (!this.getOptionVNodeFromIndex(prevIndex)) {
          break;
        }

        const option = options[prevIndex];
        const propsData = Props.getVNodeProps(option);

        if (Props.booleanStandardize(propsData?.disabled)) {
          prevIndex--;
          continue;
        }
        break;
      }

      this.activeIndex = prevIndex;
      this.refreshScroll(prevIndex, POSITION.TOP);
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

      const activeOption = this.getActiveOptionVNode();

      const closeSingle = () => {
        if (!this.multiple) {
          this.close();
        }
      };

      if (!activeOption) {
        closeSingle();
        return;
      }

      this.setSelected(Props.getVNodeProps(activeOption)?.value);
      closeSingle();
    },
    refreshScrollImplement: function(index, position) {
      const $optionTree = this.$refs['optionTree'];
      const optionDom = $optionTree.getOptionDomOfIndex(index);

      if (!optionDom) {
        return;
      }

      const $dropdown = this.getDropdownInternalRef();

      const scrollTop = $dropdown.scrollTop;
      const listHeight = $dropdown.clientHeight;

      const offsetTop = optionDom.offsetTop;
      const itemHeight = optionDom.clientHeight;

      const underTop = offsetTop >= scrollTop;
      const aboveBottom = offsetTop <= scrollTop + listHeight - itemHeight;

      if (!(underTop && aboveBottom)) {
        if (position === POSITION.BOTTOM) {
          Utils.scrollTo($dropdown, {
            x: 0,
            y: offsetTop - listHeight + itemHeight
          });
        }
        if (position === POSITION.TOP) {
          Utils.scrollTo($dropdown, {
            x: 0,
            y: offsetTop
          });
        }
      }
    },
    refreshScroll(index, position) {
      setTimeout(() => {
        this.refreshScrollImplement(index, position);
      });
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
      const optionVNodes = this.getOptionVNodes();
      if (!optionVNodes) {
        return;
      }
      const foundOptionVNode = optionVNodes.find(optionVNode => {
        return Props.getVNodeProps(optionVNode)?.value === value;
      });
      const label = Props.getVNodeProps(foundOptionVNode)?.label;
      return label;
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
    removeInvalid() {
      const optionVNodes = this.getOptionVNodes() || [];

      const valueList = optionVNodes.map(optionVNode => {
        return Props.getVNodeProps(optionVNode)?.value;
      });

      let valueHash = {};
      valueList.forEach(value => {
        valueHash[value] = true;
      });

      if (this.multiple) {
        const oldValue = this.value.slice();
        const newValue = oldValue.filter(value => {
          return valueHash[value];
        });
        this.$emit('update', newValue);
      } else {
        if (!valueHash[this.value]) {
          this.$emit('update', null);
        }
      }
    },
    getSingleSelectedIndex() {
      return this.getOptionVNodeIndexFromValue(this.value);
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

      this.width = this.$refs['select'].offsetWidth;
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
    closeDropdown(skipEmit = false) {
      document.removeEventListener('click', this.handleOtherClick);

      if (!skipEmit) {
        this.$emit('close');
      }
    },
    handleOtherClick(e) {
      const $select = this.$refs['select'];
      const stopToggle = Utils.isParentsOrSelf(e.target, $select);
      const stopDropdown = Utils.isParentsOrSelf(
        e.target,
        this.getDropdownInternalRef()
      );

      if (!(stopToggle || stopDropdown)) {
        this.opened = false;

        this.closeDropdown();
      }
    },
    handleDeleteClick(value) {
      if (this.disabled) {
        return;
      }

      this.setSelected(value);
    },
    getDropdownInternalRef() {
      return this.$refs['dropdown'].getDropdownInternalRef();
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
      novaLocale,
      opened,
      dropdownClass,
      prefixedClass,
      value,
      valueToLabel,
      width
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
        width,
        opened,
        appendToBody: appendToBody && dropdownLoaded,
        dropdownClass: [
          `${prefixedClass}-dropdown`,
          { [`${prefixedClass}-multiple-dropdown`]: multiple },
          dropdownClass
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
            name={`${Storage.prefix}-check-zoom`}
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
      optionTreeNode = (
        <OptionTree novaLocale={novaLocale} ref="optionTree"></OptionTree>
      );
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
          {singleNode}
          {multipleNode}
        </div>
        <NovaDropdown {...dropdownProps}>{optionTreeNode}</NovaDropdown>
        {children}
      </div>
    );
  }
};
