import Icon from './Icon.jsx';

export default {
  name: 'NovaAlert',
  components: { Icon },
  data() {
    return {
      visible: true,
      closing: false
    };
  },
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
        return (
          [
            'top',
            'top-start',
            'top-end',
            'bottom',
            'bottom-start',
            'bottom-end',
            'left',
            'left-start',
            'left-end',
            'right',
            'right-start',
            'right-end'
          ].indexOf(value) !== -1
        );
      }
    }
  },
  computed: {
    classNameList() {
      let border = this.border;
      let type = this.type || 'normal';
      let block = this.block;
      let closable = this.closable;
      let visibleArrow = this.visibleArrow;
      let placement = this.placement;
      let closing = this.closing;
      return [
        `nova-alert-${type}`,
        `nova-alert-placement-${placement}`,
        {
          'nova-alert-border': border,
          'nova-alert-block': block,
          'nova-alert-closing': closing,
          'nova-alert-closable': border && closable,
          'nova-alert-has-arrow': border && visibleArrow
        }
      ];
    }
  },
  render() {
    let {
      $attrs,
      $listeners,
      $slots,
      border,
      classNameList,
      closable,
      handleAfterLeave,
      handleCloseClick,
      type,
      visibleArrow
    } = this;
    let classList = [
      'nova-alert',
      ...classNameList
    ];

    let close;
    if (border && closable) {
      close = <div
        class="nova-alert-close"
        onClick={handleCloseClick}
      >
        <div class="nova-alert-close-icon"></div>
      </div>;
    }

    let children = $slots.default;

    let arrow;
    if (visibleArrow) {
      arrow = <div class="nova-alert-arrow"></div>;
    }

    return (
      <transition name="nova-alert-slide-up" onAfterLeave={handleAfterLeave}>
        <div
          v-show="visible"
          props={$attrs}
          on={$listeners}
          class={classList}
          ref="alert"
        >
          <Icon type={type}></Icon>
          {close}
          {children}
          {arrow}
        </div>
      </transition>
    );
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
  }
};
