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
  render() {
    let className = ['nova-dropdown', this.popoverClass];
    let {
      appendToBody,
      opened,
      $attrs,
      $listeners,
      $slots,
      dropdownStyle
    } = this;

    let children = $slots.default;

    let dropdownContent = (
      <transition name="nova-slide-up">
        <div
          ref="dropdownDom"
          class={className}
          v-show={opened}
          style={dropdownStyle()}
          props={$attrs}
          on={$listeners}
        >
          {children}
        </div>
      </transition>
    );

    if (appendToBody) {
      return (
        <ClientOnly>
          <MountingPortal mountTo="body" append={true} disabled={!appendToBody}>
            {dropdownContent}
          </MountingPortal>
        </ClientOnly>
      );
    } else {
      return dropdownContent;
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
      let selectHeight = select.offsetHeight;

      let offset = Utils.getElementOffset(select);

      this.offset.left = `${offset.left}px`;
      this.offset.top = `${offset.top + selectHeight}px`;
    },
    getDom() {
      return this.$refs['dropdownDom'];
    }
  }
};
