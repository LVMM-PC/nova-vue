<template>
  <ClientOnly>
    <MountingPortal mountTo="#portal-target" append :disabled="!appendToBody">
      <transition name="nova-slide-up">
        <div
          ref="dropdownDom"
          class="nova-dropdown"
          :class="popoverClass"
          v-show="opened"
          :style="dropdownStyle()"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <slot></slot>
        </div>
      </transition>
    </MountingPortal>
  </ClientOnly>
</template>

<script>
import Utils from '@/utils/utils';

export default {
  name: 'NovaDropdown',
  data() {
    return {
      offset: {
        left: 0,
        top: 0
      }
    };
  },
  props: {
    appendToBody: {
      type: Boolean
    },
    opened: {
      type: Boolean
    },
    popoverClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  methods: {
    dropdownStyle() {
      if (!this.appendToBody) {
        return {};
      }
      return this.offset;
    },
    setPosition(select) {
      let selectHeight = select.clientHeight;

      let offset = Utils.getElementOffset(select);

      this.offset.left = `${offset.left}px`;
      this.offset.top = `${offset.top + selectHeight}px`;
    },
    getDom() {
      return this.$refs['dropdownDom'];
    }
  }
};
</script>

<style lang="less">
@import '../../styles/var';

.@{prefixed}-dropdown {
  box-sizing: border-box;
  margin-top: -1px;
  font-size: 14px;
  line-height: 20px;
  position: absolute;
  background-color: #fff;
  color: @font-color;
  border: 1px solid #cccccc;
  font-family: @font-family;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.@{prefixed}-select-dropdown {
  width: 200px;
  max-height: 302px;
  overflow: auto;
}

.@{prefixed}-autocomplete-dropdown {
  margin-top: 1px;
}

.@{prefixed}-date-picker-dropdown {
  position: absolute;
  background-color: #fff;
  border: 1px solid #cccccc;
}
</style>
