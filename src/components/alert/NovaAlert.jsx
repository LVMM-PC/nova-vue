import Inventory from '@/utils/inventory';
import Icon from './Icon.jsx';

export default {
  name: 'NovaAlert',
  components: { Icon },
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-alert`
    },
    type: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    closable: {
      type: Boolean,
      default: false
    },
    visibleArrow: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom',
      validator(value) {
        return Inventory.placement.indexOf(value) !== -1;
      }
    }
  },
  data() {
    return {
      visible: true,
      closing: false
    };
  },
  computed: {
    classList() {
      const {
        block,
        border,
        closable,
        closing,
        placement,
        prefixedClass,
        type,
        visibleArrow
      } = this;

      const alertType = type || 'normal';

      return [
        prefixedClass,
        `${prefixedClass}-${alertType}`,
        `${prefixedClass}-placement-${placement}`,
        {
          [`${prefixedClass}-block`]: block,
          [`${prefixedClass}-border`]: border,
          [`${prefixedClass}-closable`]: border && closable,
          [`${prefixedClass}-closing`]: closing,
          [`${prefixedClass}-has-arrow`]: border && visibleArrow
        }
      ];
    }
  },
  methods: {
    open() {
      this.visible = true;
      this.$emit('open');
    },
    close() {
      this.visible = false;
      this.$emit('close');

      const $alert = this.$refs['alert'];

      function setHeight() {
        $alert.style.height = `${$alert.offsetHeight}px`;
      }

      /**
       * Magic code
       * We can only set twice that the height can right
       */
      setHeight();
      setHeight();

      this.closing = true;
    },
    handleCloseClick() {
      this.close();
    },
    handleCloseKeydown(e) {
      switch (e.key) {
        case 'Spacebar': // IE/Edge
        case ' ':
          e.preventDefault();
          this.close();
          break;
        case 'Enter':
          e.preventDefault();
          this.close();
          break;
      }
    },
    handleAfterLeave() {
      this.closing = false;
      const $alert = this.$refs['alert'];
      $alert.style.height = null;
      this.$emit('afterClose');
    }
  },
  render() {
    const {
      $attrs,
      $listeners,
      $slots,
      border,
      classList,
      closable,
      handleAfterLeave,
      handleCloseClick,
      handleCloseKeydown,
      prefixedClass,
      type,
      visible,
      visibleArrow
    } = this;

    const alertProps = {
      class: classList,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      },
      ref: 'alert'
    };

    let close;
    if (border && closable) {
      const closeProps = {
        class: [`${prefixedClass}-close`],
        attrs: {
          tabindex: 0
        },
        on: {
          click: handleCloseClick,
          keydown: handleCloseKeydown
        }
      };
      close = (
        <div {...closeProps}>
          <div class={`${prefixedClass}-close-icon`}></div>
        </div>
      );
    }

    const children = $slots.default;

    let arrow;
    if (visibleArrow) {
      arrow = <div class={`${prefixedClass}-arrow`}></div>;
    }

    return (
      <transition
        name={`${prefixedClass}-slide-up`}
        onAfterLeave={handleAfterLeave}
      >
        <div v-show={visible} {...alertProps}>
          <Icon type={type}></Icon>
          {close}
          {children}
          {arrow}
        </div>
      </transition>
    );
  }
};
