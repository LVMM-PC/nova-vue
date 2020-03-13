<template>
  <div
    ref="autocomplete"
    class="nova-autocomplete"
    :class="autocompleteClass"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <div class="nova-autocomplete-toggle">
      <div class="nova-autocomplete-inner">
        <input
          ref="input"
          autocomplete="off"
          class="nova-autocomplete-input"
          type="text"
          :value.prop="valueModel"
          :placeholder="placeholder"
          :disabled="disabled"
          @input="handleInput"
          @focus="handleFocus"
          @blur="handleBlur"
          @keydown="handleKeydown"
        />
        <span
          v-if="showPrefix"
          class="nova-autocomplete-overlay nova-autocomplete-prefix"
        >
          <slot name="prefix"></slot>
        </span>
        <span
          v-if="showSuffix"
          class="nova-autocomplete-overlay nova-autocomplete-suffix"
        >
          <slot name="suffix"></slot>
        </span>
      </div>
    </div>
    <NovaDropdown
      v-if="start.dropdownLoaded"
      ref="start-dropdown"
      :opened="start.opened"
      :append-to-body="appendToBody"
      :popover-class="['nova-autocomplete-dropdown', popoverClass]"
    >
      <div class="nova-autocomplete-start">
        <slot name="start"></slot>
      </div>
    </NovaDropdown>
    <NovaDropdown
      v-if="list.dropdownLoaded"
      ref="list-dropdown"
      :opened="list.opened"
      :append-to-body="appendToBody"
      :popover-class="['nova-autocomplete-dropdown', popoverClass]"
    >
      <div
        v-if="list.groups.length"
        ref="groups"
        class="nova-autocomplete-groups"
      >
        <div
          v-for="(group, groupIndex) in list.groups"
          :key="groupIndex"
          class="nova-autocomplete-group"
        >
          <div class="nova-autocomplete-label">
            <slot name="group-label" :group="group"></slot>
          </div>
          <div v-if="group.children.length" class="nova-autocomplete-list">
            <div
              v-for="item in group.children"
              :key="item.index"
              ref="items"
              class="nova-autocomplete-item"
              :class="{
                'is-selected': item.index === list.activeIndex,
                'is-disabled': item.disabled
              }"
              @click="handleItemClick(item)"
            >
              <slot :item="item">
                {{ item.value }}
              </slot>
            </div>
          </div>
        </div>
      </div>

      <template v-if="!list.data.length">
        <slot name="empty">
          <div class="nova-autocomplete-empty">
            <NovaAlert type="info">
              <span>{{ novaLocale.autocomplete.noData }}</span>
            </NovaAlert>
          </div>
        </slot>
      </template>
    </NovaDropdown>
  </div>
</template>

<script>
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
  name: 'NovaAutocomplete',
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
    showPrefix: {
      type: Boolean,
      default: false
    },
    showSuffix: {
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
    let searchDebounce = debounce(this.searchImplement, this.debounce);
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
    autocompleteClass() {
      return {
        'is-open': this.opened,
        'is-disabled': this.disabled
      };
    },
    activeItem() {
      let list = this.list;
      let index = list.activeIndex;
      let data = list.data;

      let size = data.length;
      if (index < 0 || index >= size) {
        return null;
      }
      return data[index];
    },
    firstItem() {
      let list = this.list;
      let data = list.data;

      if (data && data.length && data[0]) {
        return data[0];
      }
      return null;
    }
  },
  destroyed() {
    this.closeStartDropdown();
  },
  methods: {
    handleInput(e) {
      let activeElement = document.activeElement;
      let $input = this.$refs['input'];

      //IE BUG
      if ($input !== activeElement) {
        return;
      }

      this.valueModel = e.currentTarget.value;
      this.search();
      this.$emit('input', e);
    },
    handleFocus(e) {
      let queryString = this.valueModel;

      if (queryString && this.focusSearch) {
        this.search();
      } else {
        this.openStartDropdown();
      }

      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.$emit('blur', e);

      let firstItemIndex = this.skipDisabled(0, 1);
      let item = this.activeItem || this.list.data[firstItemIndex];

      if (this.autoSelect) {
        this.autoSelectTimer = setTimeout(() => {
          this.update(item);
        }, 100);
      }
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

      this.listInit();

      let $startDropdown = this.$refs['start-dropdown'];
      let $input = this.$refs['input'];
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
    closeStartDropdown() {
      this.start.opened = false;
      document.removeEventListener('click', this.startOtherClick);
    },
    startOtherClick(e) {
      let $autocomplete = this.$refs['autocomplete'];

      let target = e.target;
      let stopToggle = Utils.isParentsOrSelf(target, $autocomplete);
      let stopDropdown = Utils.isParentsOrSelf(
        target,
        this.getStartDropdownDom()
      );

      if (!(stopToggle || stopDropdown)) {
        this.closeStartDropdown();
      }
    },
    getStartDropdownDom() {
      let $startDropdown = this.$refs['start-dropdown'];
      if (typeof $startDropdown.getDom === 'function') {
        return $startDropdown.getDom();
      }
      return null;
    },
    getListDropdownDom() {
      let $listDropdown = this.$refs['list-dropdown'];
      if ($listDropdown && typeof $listDropdown.getDom === 'function') {
        return $listDropdown.getDom();
      }
      return null;
    },
    skipDisabled(newIndex, step) {
      let size = this.list.data.length;

      if (this.list.data[newIndex]?.disabled) {
        let disabledCount = 0;
        for (let i = 0; i < size; i++) {
          let offset = i * step;
          let tempIndex = newIndex + offset;
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

        return newIndex;
      } else {
        return newIndex;
      }
    },
    moveDown() {
      let size = this.list.data.length;
      if (size === 0) {
        return;
      }

      let oldIndex = this.list.activeIndex;
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
        let $items = this.$refs['items'];
        let $groups = this.$refs['groups'];
        let $activeItem = $items[index];
        if ($activeItem) {
          let scrollTop = $groups.scrollTop;
          let listHeight = $groups.clientHeight;
          let offsetTop = $activeItem.offsetTop;
          let itemHeight = $activeItem.clientHeight;

          let underTop = offsetTop >= scrollTop;
          let aboveBottom = offsetTop <= scrollTop + listHeight - itemHeight;
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
      let size = this.list.data.length;
      if (size === 0) {
        return;
      }
      let oldIndex = this.list.activeIndex;
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
    closeDropdown() {
      this.closeStartDropdown();
      this.closeListDropdown();
    },
    cancelSearch() {
      this.closeDropdown();
    },
    search() {
      setTimeout(() => {
        this.queryString = this.valueModel;
        this.searchDebounce.call();
      }, 150);
    },
    searchImplement() {
      if (this.queryString === '') {
        this.openStartDropdown();
      } else {
        this.fetchSuggestions.call(
          undefined,
          this.queryString,
          (result, groups) => {
            result = result.map((item, index) => {
              return Object.assign({ index: index }, item);
            });

            if (!groups) {
              groups = [{ type: 'default', children: result }];
            }

            if (result && result.length) {
              this.list.data = result;
              this.list.groups = groups;
            } else {
              this.list.data = [];
              this.list.groups = [];
            }
            this.list.activeIndex = -1;
            this.openListDropdown();
          }
        );
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
      let $input = this.$refs['input'];
      let $listDropdown = this.$refs['list-dropdown'];
      $listDropdown.setPosition($input);
    },
    listOtherClick(e) {
      let $autocomplete = this.$refs['autocomplete'];

      let target = e.target;
      let stopToggle = Utils.isParentsOrSelf(target, $autocomplete);
      let stopDropdown = Utils.isParentsOrSelf(
        target,
        this.getListDropdownDom()
      );

      if (!(stopToggle || stopDropdown)) {
        this.closeListDropdown();
      }
    },
    closeListDropdown() {
      this.listInit();
      document.removeEventListener('click', this.listOtherClick);
    },
    update(item) {
      this.clearAutoSelect();

      if (item === null || typeof item === 'undefined') {
        this.$emit('select', item);
        return;
      }
      let queryString = item.value;
      this.queryString = queryString;
      this.$emit('update', queryString);
      this.$emit('select', item);
    },
    handleItemClick(item) {
      this.clearAutoSelect();

      if (item.disabled) {
        return;
      }
      let queryString = item.value;
      this.queryString = queryString;
      this.$emit('update', queryString);
      this.$emit('select', item);
      this.closeListDropdown();
    },
    clearAutoSelect() {
      clearTimeout(this.autoSelectTimer);
    },
    focus() {
      let $input = this.$refs['input'];
      $input.focus();
    },
    blur() {
      let $input = this.$refs['input'];
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
  }
};
</script>
