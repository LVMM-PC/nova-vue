import Utils from '@/utils/utils';
import Storage from '@/utils/storage';

export default {
  name: 'NovaDropdown',
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-dropdown`
    },
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
      $attrs,
      $listeners,
      $slots,
      appendToBody,
      dropdownStyle,
      opened,
      popoverClass,
      prefixedClass
    } = this;

    const classList = [prefixedClass, popoverClass];

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
      <transition name={`${Storage.prefix}-slide-up`}>
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
