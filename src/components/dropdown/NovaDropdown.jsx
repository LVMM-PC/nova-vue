import Utils from '@/utils/utils';

export default {
  name: 'NovaDropdown',
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
  data() {
    return {
      offset: {
        left: 0,
        top: 0
      }
    };
  },
  computed: {
    dropdownStyle() {
      if (!this.appendToBody) {
        return {};
      }
      return this.offset;
    }
  },
  methods: {
    setPosition(select) {
      let selectHeight = select.offsetHeight;

      let offset = Utils.getElementOffset(select);

      this.offset.left = `${offset.left}px`;
      this.offset.top = `${offset.top + selectHeight}px`;
    },
    getDom() {
      return this.$refs['dropdownDom'];
    }
  },
  render() {
    const {
      appendToBody,
      opened,
      $attrs,
      $listeners,
      $slots,
      dropdownStyle,
      popoverClass
    } = this;

    const classList = ['nova-dropdown', popoverClass];

    const children = $slots.default;

    const dropdownProps = {
      class: classList,
      style: dropdownStyle,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      },
      ref: 'dropdownDom'
    };

    const dropdownContent = (
      <transition name="nova-slide-up">
        <div v-show={opened} {...dropdownProps}>
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
  }
};
