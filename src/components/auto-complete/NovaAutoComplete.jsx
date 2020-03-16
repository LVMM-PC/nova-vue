import debounce from 'lodash/debounce';
import Utils from '@/utils/utils';
import locale from '@/mixin/locale';
import NovaDropdown from '@/components/dropdown/NovaDropdown.jsx';
import NovaAlert from '@/components/alert/NovaAlert.jsx';

const POSITION = {
  BOTTOM: 'BOTTOM',
  TOP: 'TOP'
};

export default {
  name: 'NovaAutoComplete',
  components: { NovaAlert, NovaDropdown },
  mixins: [locale],
  model: {
    event: 'update'
  },
  props: {
    value: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    debounce: {
      type: Number,
      default: 150
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    popoverClass: {
      type: String,
      default: null
    },
    fetchSuggestions: {
      type: Function,
      default: () => {}
    },
    autoSelect: {
      type: Boolean,
      default: false
    },
    focusSearch: {
      type: Boolean,
      default: false
    }
  },
  data() {
    const searchDebounce = debounce(this.searchImplement, this.debounce);
    return {
      searchDebounce: searchDebounce,
      queryString: '',
      start: {
        dropdownLoaded: false,
        opened: false
      },
      list: {
        dropdownLoaded: false,
        opened: false,
        data: [],
        groups: [],
        activeIndex: -1
      },
      autoSelectTimer: null
    };
  },
  computed: {
    valueModel: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('update', value);
      }
    },
    autoCompleteClass() {
      return {
        'is-open': this.opened,
        'is-disabled': this.disabled
      };
    },
    activeItem() {
      const list = this.list;
      const index = list.activeIndex;
      const data = list.data;

      const size = data.length;
      if (index < 0 || index >= size) {
        return null;
      }
      return data[index];
    },
    firstItem() {
      const list = this.list;
      const data = list.data;

      if (data && data.length && data[0]) {
        return data[0];
      }
      return null;
    }
  },
  destroyed() {
    this.closeDropdown(true);
  },
  methods: {
    handleInput(e) {
      const activeElement = document.activeElement;
      const $input = this.$refs['input'];

      //IE BUG
      if ($input !== activeElement) {
        return;
      }

      this.valueModel = e.currentTarget.value;
      this.search();
      this.$emit('input', e);
    },
    handleFocus(e) {
      const queryString = this.valueModel;

      if (queryString && this.focusSearch) {
        this.search();
      } else {
        this.openStartDropdown();
      }

      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.$emit('blur', e);

      const firstItemIndex = this.skipDisabled(0, 1);
      const item = this.activeItem || this.list.data[firstItemIndex];

      if (this.autoSelect) {
        this.autoSelectTimer = setTimeout(() => {
          this.update(item);
        }, 100);
      }
    },
    handleSelect(e) {
      e.stopPropagation();
    },
    handleKeydown(e) {
      switch (e.key) {
        case 'Down': // IE/Edge
        case 'ArrowDown':
          this.moveDown();
          e.preventDefault();
          break;
        case 'Up': // IE/Edge
        case 'ArrowUp':
          this.moveUp();
          e.preventDefault();
          break;
        case 'Left': // IE/Edge
        case 'ArrowLeft':
          break;
        case 'Right': // IE/Edge
        case 'ArrowRight':
          break;
        case 'Enter':
          this.select();
          break;
        case 'Tab':
          this.cancelSearch();
          break;
        case 'Esc': // IE/Edge
        case 'Escape':
          this.cancelSearch();
          break;
        default:
          this.search();
          return;
      }
    },
    openStartDropdown() {
      if (!this.start.dropdownLoaded) {
        this.start.dropdownLoaded = true;
        this.$nextTick(() => {
          this.openStartDropdown();
        });
        return;
      }

      document.addEventListener('click', this.startOtherClick);
      this.start.opened = true;
      this.$emit('open', 'start');

      this.listInit();

      const $startDropdown = this.$refs['start-dropdown'];
      const $input = this.$refs['input'];
      $startDropdown.setPosition($input);
    },
    listInit() {
      this.list.opened = false;

      this.$nextTick(() => {
        this.list.data = [];
        this.list.groups = [];
        this.list.activeIndex = -1;
      });
    },
    closeStartDropdown(notEmit) {
      this.start.opened = false;
      document.removeEventListener('click', this.startOtherClick);

      if (!notEmit) {
        this.$emit('close', 'start');
      }
    },
    startOtherClick(e) {
      const $autoComplete = this.$refs['auto-complete'];

      const target = e.target;
      const stopToggle = Utils.isParentsOrSelf(target, $autoComplete);
      const stopDropdown = Utils.isParentsOrSelf(
        target,
        this.getStartDropdownDom()
      );

      if (!(stopToggle || stopDropdown)) {
        this.closeStartDropdown();
      }
    },
    getStartDropdownDom() {
      const $startDropdown = this.$refs['start-dropdown'];
      if (typeof $startDropdown.getDom === 'function') {
        return $startDropdown.getDom();
      }
      return null;
    },
    getListDropdownDom() {
      const $listDropdown = this.$refs['list-dropdown'];
      if ($listDropdown && typeof $listDropdown.getDom === 'function') {
        return $listDropdown.getDom();
      }
      return null;
    },
    skipDisabled(newIndex, step) {
      const size = this.list.data.length;

      if (this.list.data[newIndex]?.disabled) {
        let disabledCount = 0;
        for (let i = 0; i < size; i++) {
          const offset = i * step;
          const tempIndex = newIndex + offset;
          if (this.list.data[tempIndex]?.disabled) {
            disabledCount++;
          } else {
            newIndex = tempIndex;
            break;
          }
        }
        if (disabledCount === size) {
          newIndex = -1;
        }

        if (newIndex >= size) {
          newIndex = -1;
        }

        return newIndex;
      } else {
        return newIndex;
      }
    },
    moveDown() {
      const size = this.list.data.length;
      if (size === 0) {
        return;
      }

      const oldIndex = this.list.activeIndex;
      let newIndex = oldIndex + 1;
      if (newIndex >= size) {
        newIndex = -1;
      }

      newIndex = this.skipDisabled(newIndex, 1);

      this.list.activeIndex = newIndex;
      this.update(this.activeItem);

      this.refreshItemScrollTop(newIndex, POSITION.BOTTOM);
    },
    refreshItemScrollTop(index, position) {
      if (this.activeItem) {
        const $items = this.$refs['items'];
        const $groups = this.$refs['groups'];
        const $activeItem = $items[index];
        if ($activeItem) {
          const scrollTop = $groups.scrollTop;
          const listHeight = $groups.clientHeight;
          const offsetTop = $activeItem.offsetTop;
          const itemHeight = $activeItem.clientHeight;

          const underTop = offsetTop >= scrollTop;
          const aboveBottom = offsetTop <= scrollTop + listHeight - itemHeight;
          if (!(underTop && aboveBottom)) {
            if (position === POSITION.BOTTOM) {
              $groups.scrollTo(0, offsetTop - listHeight + itemHeight);
            }
            if (position === POSITION.TOP) {
              $groups.scrollTo(0, offsetTop);
            }
          }
        }
      }
    },
    moveUp() {
      const size = this.list.data.length;
      if (size === 0) {
        return;
      }
      const oldIndex = this.list.activeIndex;
      let newIndex = oldIndex - 1;
      if (newIndex === -2) {
        newIndex = size - 1;
      }
      newIndex = this.skipDisabled(newIndex, -1);
      this.list.activeIndex = newIndex;
      this.update(this.activeItem);
      this.refreshItemScrollTop(newIndex, POSITION.TOP);
    },
    select() {},
    closeDropdown(notEmit) {
      this.closeStartDropdown(notEmit);
      this.closeListDropdown(notEmit);
    },
    cancelSearch() {
      this.closeDropdown();
    },
    search() {
      setTimeout(() => {
        this.queryString = this.valueModel;
        this.searchDebounce.call();
      }, 0);
    },
    searchImplement() {
      if (this.queryString === '') {
        this.openStartDropdown();
      } else {
        this.fetchSuggestions.call(undefined, this.queryString, result => {
          let groups;

          if (result?.[0]?.children) {
            groups = result;
          } else {
            groups = [{ type: 'default', children: result }];
          }

          if (result?.length) {
            const list = [];
            let index = 0;
            groups.forEach(group => {
              group.children.forEach(child => {
                Object.assign(child, { index: index });
                list.push(child);
                index++;
              });
            });

            this.list.data = list;
            this.list.groups = groups;
          } else {
            this.list.data = [];
            this.list.groups = [];
          }
          this.list.activeIndex = -1;
          this.openListDropdown();
        });
      }
    },
    openListDropdown() {
      if (!this.list.dropdownLoaded) {
        this.list.dropdownLoaded = true;
        this.$nextTick(() => {
          this.openListDropdown();
        });
        return;
      }

      document.addEventListener('click', this.listOtherClick);
      this.list.opened = true;
      this.start.opened = false;
      this.$emit('open', 'list');

      const $input = this.$refs['input'];
      const $listDropdown = this.$refs['list-dropdown'];
      $listDropdown.setPosition($input);
    },
    listOtherClick(e) {
      const $autoComplete = this.$refs['auto-complete'];

      const target = e.target;
      const stopToggle = Utils.isParentsOrSelf(target, $autoComplete);
      const stopDropdown = Utils.isParentsOrSelf(
        target,
        this.getListDropdownDom()
      );

      if (!(stopToggle || stopDropdown)) {
        this.closeListDropdown();
      }
    },
    closeListDropdown(notEmit) {
      this.list.opened = false;
      document.removeEventListener('click', this.listOtherClick);

      if (!notEmit) {
        this.$emit('close', 'list');
      }
    },
    update(item) {
      this.clearAutoSelect();

      if (item === null || typeof item === 'undefined') {
        this.$emit('select', item?.value, item);
        return;
      }
      const queryString = item.value;
      this.queryString = queryString;
      this.$emit('update', queryString);
      this.$emit('select', item?.value, item);
    },
    handleItemClick(item) {
      this.clearAutoSelect();

      if (item.disabled) {
        return;
      }
      const queryString = item.value;
      this.queryString = queryString;
      this.$emit('update', queryString);
      this.$emit('select', item?.value, item);
      this.closeListDropdown();
    },
    clearAutoSelect() {
      clearTimeout(this.autoSelectTimer);
    },
    focus() {
      const $input = this.$refs['input'];
      $input.focus();
    },
    blur() {
      const $input = this.$refs['input'];
      $input.blur();
    },
    openStart() {
      this.openStartDropdown();
    },
    openList() {
      this.openListDropdown();
    },
    closeStart() {
      this.closeStartDropdown();
    },
    closeList() {
      this.closeListDropdown();
    },
    close() {
      this.closeDropdown();
    }
  },
  render() {
    const {
      $attrs,
      $listenrs,
      $scopedSlots,
      $slots,
      appendToBody,
      autoCompleteClass,
      disabled,
      handleBlur,
      handleFocus,
      handleInput,
      handleItemClick,
      handleKeydown,
      handleSelect,
      list,
      novaLocale,
      placeholder,
      popoverClass,
      queryString,
      start,
      valueModel
    } = this;

    const inputProps = {
      ref: 'input',
      class: `nova-auto-complete-input`,
      attrs: {
        disabled: disabled,
        placeholder: placeholder,
        autocomplete: 'off',
        type: 'text'
      },
      domProps: {
        value: valueModel
      },
      on: {
        blur: handleBlur,
        focus: handleFocus,
        input: handleInput,
        keydown: handleKeydown,
        select: handleSelect
      }
    };
    const toggleNode = (
      <div class="nova-auto-complete-toggle">
        <div class="nova-auto-complete-inner">
          <input {...inputProps} />
        </div>
      </div>
    );

    let startNode;
    if (start.dropdownLoaded) {
      const startDropdownProps = {
        ref: 'start-dropdown',
        props: {
          appendToBody: appendToBody,
          opened: start.opened,
          popoverClass: ['nova-auto-complete-dropdown', popoverClass]
        }
      };

      startNode = (
        <NovaDropdown {...startDropdownProps}>
          <div class="nova-auto-complete-start">{$slots.start}</div>
        </NovaDropdown>
      );
    }

    let listNode;
    if (list.dropdownLoaded) {
      const listDropdownProps = {
        ref: 'list-dropdown',
        props: {
          appendToBody: appendToBody,
          opened: list.opened,
          popoverClass: ['nova-auto-complete-dropdown', popoverClass]
        }
      };

      let groupsNode;
      if (list.dropdownLoaded) {
        const groupList = list.groups.map((group, groupIndex) => {
          const groupLabelSlotProps = {
            group
          };
          const groupLabel = $scopedSlots.groupLabel
            ? $scopedSlots.groupLabel(groupLabelSlotProps)
            : group.label;

          const labelNode = (
            <div class={`nova-auto-complete-label`}>{groupLabel}</div>
          );

          let childrenNode;
          if (group.children.length) {
            const itemList = group.children.map(item => {
              const itemProps = {
                key: item.index,
                ref: 'items',
                refInFor: true,
                class: [
                  `nova-auto-complete-item`,
                  {
                    'is-selected': item.index === list.activeIndex,
                    'is-disabled': item.disabled
                  }
                ],
                on: {
                  click() {
                    handleItemClick(item);
                  }
                }
              };

              const itemSlotProps = {
                item
              };
              const itemSlot = $scopedSlots.default
                ? $scopedSlots.default(itemSlotProps)
                : item.value;

              return <div {...itemProps}>{itemSlot}</div>;
            });

            childrenNode = (
              <div class={`nova-auto-complete-list`}>{itemList}</div>
            );
          }

          const groupProps = {
            key: groupIndex,
            class: `nova-auto-complete-group`
          };
          return (
            <div {...groupProps}>
              {labelNode}
              {childrenNode}
            </div>
          );
        });

        const groupProps = {
          ref: 'groups',
          class: `nova-auto-complete-groups`
        };
        groupsNode = <div {...groupProps}>{groupList}</div>;
      }

      let emptyNode;
      if (!list.data.length && queryString) {
        const defaultEmptyNode = (
          <div class={`nova-auto-complete-empty`}>
            <NovaAlert type="info">
              <span>{novaLocale.autoComplete.noData}</span>
            </NovaAlert>
          </div>
        );
        emptyNode = $slots.empty || defaultEmptyNode;
      }

      listNode = (
        <NovaDropdown {...listDropdownProps}>
          {groupsNode}
          {emptyNode}
        </NovaDropdown>
      );
    }

    const autoCompleteProps = {
      ref: 'auto-complete',
      class: [`nova-auto-complete`, autoCompleteClass],
      attrs: {
        ...$attrs
      },
      on: {
        ...$listenrs
      }
    };
    return (
      <div {...autoCompleteProps}>
        {toggleNode}
        {startNode}
        {listNode}
      </div>
    );
  }
};
