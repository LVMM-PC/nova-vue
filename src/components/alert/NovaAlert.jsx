import Storage from '@/utils/storage';
import Icon from './Icon.jsx';

export default {
  name: 'NovaAlert',
  components: { Icon },
  props: {
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
        return Storage.placement.indexOf(value) !== -1;
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
        type,
        visibleArrow
      } = this;

      const alertType = type || 'normal';

      return [
        'nova-alert',
        `nova-alert-${alertType}`,
        `nova-alert-placement-${placement}`,
        {
          'nova-alert-block': block,
          'nova-alert-border': border,
          'nova-alert-closable': border && closable,
          'nova-alert-closing': closing,
          'nova-alert-has-arrow': border && visibleArrow
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

      let $alert = this.$refs['alert'];

      $alert.style.height = `${$alert.offsetHeight}px`;
      // Magic code
      // We can only set twice that the height can right
      $alert.style.height = `${$alert.offsetHeight}px`;

      this.closing = true;
    },
    handleCloseClick() {
      this.close();
    },
    handleAfterLeave() {
      this.closing = false;
      let $alert = this.$refs['alert'];
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
      type,
      visibleArrow
    } = this;

    let close;
    if (border && closable) {
      close = (
        <div class="nova-alert-close" onClick={handleCloseClick}>
          <div class="nova-alert-close-icon"></div>
        </div>
      );
    }

    const children = $slots.default;

    let arrow;
    if (visibleArrow) {
      arrow = <div class="nova-alert-arrow"></div>;
    }

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

    return (
      <transition name="nova-alert-slide-up" onAfterLeave={handleAfterLeave}>
        <div v-show="visible" {...alertProps}>
          <Icon type={type}></Icon>
          {close}
          {children}
          {arrow}
        </div>
      </transition>
    );
  }
};
