import {
  computed,
  createElement,
  reactive,
  ref,
  watch,
  watchEffect
} from '@vue/composition-api';
import Storage from '@/utils/storage';
import Utils from '@/utils/utils';
import NovaButton from '@/components/button/NovaButton';
import NovaIconClose from '@/icons/NovaIconClose';
import { useClickPosition } from '@/uses/mouse';
import Props from '@/utils/props';

// eslint-disable-next-line no-unused-vars
const h = createElement;

function useWrapTransition(props) {
  const animationReady = ref(false);
  const transformOrigin = ref('');

  const { x, y } = useClickPosition();

  watch(
    () => props.visible,
    (visible, prevVisible) => {
      setTimeout(() => {
        if (!prevVisible && visible) {
          animationReady.value = true;
          if (x.value || y.value) {
            transformOrigin.value = `${x.value}px ${y.value}px`;
          } else {
            transformOrigin.value = '';
          }
        }
      });
    }
  );

  return {
    animationReady,
    transformOrigin
  };
}

function useWrap(props, transformOrigin) {
  const wrapStyle = reactive({
    ['transform-origin']: transformOrigin
  });
  const wrapClassList = computed(() => {
    return [`${props.prefixedClass}-wrap`, props.wrapClass];
  });

  return { wrapStyle, wrapClassList };
}

function useModal(props) {
  const modalStyle = reactive({
    width: Props.styleLengthStandardize(props.width)
  });

  return { modalStyle };
}

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

    const { animationReady, transformOrigin } = useWrapTransition(props);
    const { modalStyle } = useModal(props);
    const { wrapStyle, wrapClassList } = useWrap(props, transformOrigin);

    function handleCancel(...args) {
      emit('cancel', ...args);
    }

    function handleOk(...args) {
      emit('ok', ...args);
    }

    function handleWrapClick(e, ...restArgs) {
      if (!props.maskClosable) {
        return;
      }

      const target = e.target;
      const isClickInModal = Utils.isParentsOrSelf(target, refs['modal']);

      if (!isClickInModal) {
        handleCancel(e, ...restArgs);
      }
    }

    return () => {
      if (!state.loaded) {
        return null;
      }

      function createClose() {
        if (props.closable) {
          return (
            <div
              class={`${props.prefixedClass}-close`}
              tabIndex="0"
              onClick={handleCancel}
            >
              <NovaIconClose />
            </div>
          );
        }
      }

      function createTitle() {
        if (props.title) {
          return (
            <div class={`${props.prefixedClass}-title`}>{props.title}</div>
          );
        }
      }

      function createHeader() {
        const titleNode = createTitle();

        return <div class={`${props.prefixedClass}-header`}>{titleNode}</div>;
      }

      function createBody() {
        const children = slots.default?.();

        return <div class={`${props.prefixedClass}-body`}>{children}</div>;
      }

      function createDefaultFooter() {
        return [
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
      }

      function createFooter() {
        const footer = slots.footer?.();
        const defaultFooter = createDefaultFooter();

        return (
          <div class={`${props.prefixedClass}-footer`}>
            {footer ?? defaultFooter}
          </div>
        );
      }

      function createModal() {
        const modalProps = {
          ref: 'modal',
          on: listeners,
          attrs
        };

        const closeNode = createClose();
        const headerNode = createHeader();
        const bodyNode = createBody();
        const footerNode = createFooter();

        return (
          <div class={props.prefixedClass} style={modalStyle} {...modalProps}>
            <div class={`${props.prefixedClass}-content`}>
              {closeNode}
              {headerNode}
              {bodyNode}
              {footerNode}
            </div>
          </div>
        );
      }

      function createMask() {
        if (props.mask) {
          return (
            <transition name={`${Storage.prefix}-fade`}>
              <div
                class={`${props.prefixedClass}-mask`}
                vShow={animationReady.value && props.visible}
              ></div>
            </transition>
          );
        }
      }

      function createWrap() {
        const modalNode = createModal();

        return (
          <transition name={`${Storage.prefix}-modal-zoom`}>
            <div
              class={wrapClassList.value}
              style={wrapStyle}
              onClick={handleWrapClick}
              vShow={animationReady.value && props.visible}
            >
              {modalNode}
            </div>
          </transition>
        );
      }

      function createRoot() {
        const maskNode = createMask();
        const wrapNode = createWrap();

        return (
          <div class={`${props.prefixedClass}-root`}>
            {maskNode}
            {wrapNode}
          </div>
        );
      }

      const rootNode = createRoot();

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
