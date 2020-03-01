<template>
  <div>
    <ClientOnly>
      <MountingPortal mountTo="#portal-target" append :disabled="!appendToBody">
        <div
          ref="dropdownDom"
          class="nova-ui-dropdown"
          :class="popoverClass"
          v-show="opened"
          :style="dropdownStyle()"
          v-bind="$attrs"
          v-on="$listeners"
        >
          <slot></slot>
        </div>
      </MountingPortal>
    </ClientOnly>
  </div>
</template>

<script>
import Utils from '../../utils/utils';

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

.nova-ui-dropdown {
  box-sizing: border-box;
  margin-top: -1px;
  font-size: 14px;
  line-height: 20px;
  position: absolute;
  background-color: #fff;
  border: 1px solid #cccccc;
  font-family: @font-family;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
}

.nova-ui-select-dropdown {
  width: 200px;
  max-height: 302px;
  overflow: auto;
}

.nova-ui-autocomplete-dropdown {
  margin-top: 1px;
}

.nova-ui-date-picker-dropdown {
  position: absolute;
  background-color: #fff;
  border: 1px solid #cccccc;
}
</style>
