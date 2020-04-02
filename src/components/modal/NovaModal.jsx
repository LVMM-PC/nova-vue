import {
  computed,
  createElement,
  reactive,
  watchEffect
} from '@vue/composition-api';
import Storage from '@/utils/storage';
import Utils from '@/utils/utils';
import NovaButton from '@/components/button/NovaButton';
import NovaIconClose from '@/icons/NovaIconClose';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'NovaModal',
  model: {
    prop: 'visible',
    event: 'update'
  },
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-modal`
    },
    visible: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: null
    },
    width: {
      type: [Number, String],
      default: 400
    },
    wrapClass: {
      type: String,
      default: null
    },
    closable: {
      type: Boolean,
      default: true
    },
    mask: {
      type: Boolean,
      default: true
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    confirmLoading: {
      type: Boolean,
      default: false
    },
    okText: {
      type: String,
      default: 'Ok'
    },
    okType: {
      type: String,
      default: 'secondary'
    },
    okButtonProps: {
      type: Object,
      default: null
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    },
    cancelType: {
      type: String,
      default: null
    },
    cancelButtonProps: {
      type: Object,
      default: null
    }
  },
  setup: (props, context) => {
    const { attrs, listeners, slots, emit, refs } = context;

    const state = reactive({
      loaded: false
    });

    watchEffect(() => {
      if (props.visible) {
        state.loaded = true;
      }
    });

    function close() {
      emit('update', false);
    }

    function handleClose() {
      close();
    }

    function handleCancel() {
      emit('cancel');
    }

    function handleOk() {
      emit('ok');
    }

    const modalClassList = computed(() => {
      return [props.prefixedClass];
    });

    const modalStyle = reactive({
      width: typeof props.width === 'string' ? props.width : `${props.width}px`
    });

    function handleWrapClick(e) {
      if (!props.maskClosable) {
        return;
      }

      const target = e.target;

      const isClickInModal = Utils.isParentsOrSelf(target, refs['modal']);
      if (!isClickInModal) {
        close();
      }
    }

    return () => {
      if (!state.loaded) {
        return null;
      }

      const modalProps = {
        ref: 'modal',
        on: listeners,
        attrs
      };

      let footer;
      if (slots.footer) {
        footer = slots.footer();
      }

      let children;
      if (slots.default) {
        children = slots.default();
      }

      let closeNode;
      if (props.closable) {
        closeNode = (
          <div
            class={`${props.prefixedClass}-close`}
            tabIndex="0"
            onClick={handleClose}
          >
            <NovaIconClose />
          </div>
        );
      }

      let titleNode;
      if (props.title) {
        titleNode = (
          <div class={`${props.prefixedClass}-title`}>{props.title}</div>
        );
      }

      const headerNode = (
        <div class={`${props.prefixedClass}-header`}>{titleNode}</div>
      );

      const bodyNode = (
        <div class={`${props.prefixedClass}-body`}>{children}</div>
      );

      const defaultFooter = [
        <NovaButton
          onClick={handleCancel}
          type={props.cancelType}
          {...props.cancelButtonProps}
        >
          {props.cancelText}
        </NovaButton>,
        <NovaButton
          onClick={handleOk}
          type={props.okType}
          loading={props.confirmLoading}
          {...props.okButtonProps}
        >
          {props.okText}
        </NovaButton>
      ];

      const footerNode = (
        <div class={`${props.prefixedClass}-footer`}>
          {footer || defaultFooter}
        </div>
      );

      const modalNode = (
        <div class={modalClassList.value} style={modalStyle} {...modalProps}>
          <div class={`${props.prefixedClass}-content`}>
            {closeNode}
            {headerNode}
            {bodyNode}
            {footerNode}
          </div>
        </div>
      );

      const rootClassList = computed(() => {
        return [
          `${props.prefixedClass}-root`,
          {
            [`${props.prefixedClass}-root-hidden`]: !props.visible
          }
        ];
      });

      const wrapClassList = computed(() => {
        return [`${props.prefixedClass}-wrap`, props.wrapClass];
      });

      let maskNode;
      if (props.mask) {
        maskNode = <div class={`${props.prefixedClass}-mask`}></div>;
      }

      const rootNode = (
        <div class={rootClassList.value}>
          {maskNode}
          <div class={wrapClassList.value} onClick={handleWrapClick}>
            {modalNode}
          </div>
        </div>
      );

      if (props.appendToBody) {
        return (
          <ClientOnly>
            <MountingPortal
              mountTo="body"
              append={true}
              disabled={!props.appendToBody}
            >
              {rootNode}
            </MountingPortal>
          </ClientOnly>
        );
      }

      return rootNode;
    };
  }
};
