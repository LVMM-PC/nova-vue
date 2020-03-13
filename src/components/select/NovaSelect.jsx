import locale from '@/mixin/locale';
import Storage from '@/utils/storage';
import Utils from '@/utils/utils';
import NovaDropdown from '@/components/dropdown/NovaDropdown.jsx';

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
      currentChild: null,
      multipleOptions: []
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
    this.closeDropdown();
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
    },
    getValue() {
      return this.value;
    },
    close() {
      this.opened = false;
      this.closeDropdown();
    },
    handleToggleClick(e) {
      const { prefixedClass } = this;

      if (!this.dropdownLoaded) {
        this.dropdownLoaded = true;
        this.$nextTick(() => {
          this.handleToggleClick(e);
        });
        return;
      }

      if (this.disabled) {
        return;
      }

      const target = e.target;
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
    closeDropdown() {
      document.removeEventListener('click', this.handleOtherClick);
      this.$emit('close');
    },
    handleOtherClick(e) {
      const $select = this.$refs['select'];
      const stopToggle = Utils.isParentsOrSelf(e.target, $select);
      const stopDropdown = Utils.isParentsOrSelf(e.target, this.getDropdownDom());

      if (!(stopToggle || stopDropdown)) {
        this.opened = false;

        this.closeDropdown();
      }
    },
    addMultipleOption(option) {
      this.multipleOptions.push(option);
    },
    handleDeleteClick(value) {
      if (this.disabled) {
        return;
      }

      this.setSelected(value);
    },
    getDropdownDom() {
      return this.$refs['dropdown'].getDom();
    }
  },
  render() {
    const {
      $attrs,
      $listeners,
      $slots,
      classList,
      disabled,
      opened,
      appendToBody,
      dropdownLoaded,
      popoverClass,
      handleToggleClick,
      getPlaceholder,
      displayedLabel,
      value,
      multiple,
      hasValue,
      handleTransitionFinished,
      valueToLabel,
      handleDeleteClick,
      prefixedClass
    } = this;

    const selectProps = {
      class: classList,
      attrs: {
        ...$attrs,
        tabindex: !disabled ? 0 : -1
      },
      on: {
        ...$listeners
      },
      ref: 'select'
    };

    const dropdownProps = {
      props: {
        opened,
        appendToBody: appendToBody && dropdownLoaded,
        popoverClass: [`${prefixedClass}-dropdown`, popoverClass]
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
          <span class={textClassName}>{displayedLabel() || value}</span>
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
        <div class={`${prefixedClass}-toggle`} onClick={handleToggleClick}>
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
