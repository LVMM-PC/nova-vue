import Utils from '@/utils/utils';
import Inventory from '@/utils/inventory';

export default {
  name: 'NovaDropdown',
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-dropdown`
    },
    appendToBody: {
      type: Boolean
    },
    opened: {
      type: Boolean
    },
    dropdownClass: {
      type: [String, Array, Object],
      default: null
    },
    width: {
      type: Number,
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
      const width = this.width;
      const styleWidth = {
        width: `${width}px`
      };
      if (!this.appendToBody) {
        return styleWidth;
      }

      return Object.assign({}, styleWidth, this.offset);
    }
  },
  methods: {
    setPosition(targetDom) {
      let targetHeight = targetDom.offsetHeight;
      let offset = Utils.getElementPosition(targetDom);
      this.offset.left = `${offset.left}px`;
      this.offset.top = `${offset.top + targetHeight}px`;
    },
    getDropdownInternalRef() {
      return this.$refs['dropdown'];
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
      dropdownClass,
      prefixedClass
    } = this;

    const classList = [prefixedClass, dropdownClass];

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
      ref: 'dropdown'
    };

    const dropdownContent = (
      <transition name={`${Inventory.prefix}-slide-up`}>
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
    }

    return dropdownContent;
  }
};
