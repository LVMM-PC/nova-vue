import {
  computed,
  createElement,
  reactive,
  ref,
  watch,
  watchEffect
} from '@vue/composition-api';
import Inventory from '../../utils/inventory';
import Utils from '@/utils/utils';
import NovaButton from '@/components/button/NovaButton.jsx';
import NovaIconClose from '@/icons/NovaIconClose.jsx';
import { useClickPosition } from '@/uses/mouse';
import Props from '@/utils/props';
import { useLocale } from '@/uses/locale';
import modalProps from './modal-props';

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
    ...modalProps,
    visible: {
      type: Boolean,
      default: false
    },
    icon: {
      type: [Object, Function],
      default: null
    },
    maskClosable: {
      type: Boolean,
      default: true
    },
    className: {
      type: [String, Array, Object],
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

    const { novaLocale } = useLocale(props);
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

      function renderClose() {
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

      function renderTitle() {
        if (props.title) {
          return (
            <div class={`${props.prefixedClass}-title`}>{props.title}</div>
          );
        }
      }

      function renderIcon() {
        const icon = Props.vNodeStandardize(props.icon);
        return <div class={`${props.prefixedClass}-icon`}>{icon}</div>;
      }

      function renderHeader() {
        const titleNode = renderTitle();

        return <div class={`${props.prefixedClass}-header`}>{titleNode}</div>;
      }

      function renderBody() {
        const children = slots.default?.();

        return <div class={`${props.prefixedClass}-body`}>{children}</div>;
      }

      function renderCancel() {
        const cancelText = props.cancelText ?? novaLocale.modal.cancel;

        if (props.visibleCancel) {
          return (
            <NovaButton
              onClick={handleCancel}
              type={props.cancelType}
              {...props.cancelButtonProps}
            >
              {cancelText}
            </NovaButton>
          );
        }
      }

      function renderOk() {
        const okText = props.okText ?? novaLocale.modal.ok;

        if (props.visibleOk) {
          return (
            <NovaButton
              onClick={handleOk}
              type={props.okType}
              loading={props.confirmLoading}
              {...props.okButtonProps}
            >
              {okText}
            </NovaButton>
          );
        }
      }

      function renderDefaultFooter() {
        const okNode = renderOk();
        const cancelNode = renderCancel();

        return [cancelNode, okNode];
      }

      function renderFooter() {
        const footer = slots.footer?.();
        const defaultFooter = renderDefaultFooter();

        return (
          <div class={`${props.prefixedClass}-footer`}>
            {footer ?? defaultFooter}
          </div>
        );
      }

      function renderModal() {
        const modalProps = {
          class: [props.prefixedClass, props.className],
          ref: 'modal',
          on: listeners,
          attrs
        };

        const closeNode = renderClose();
        const iconNode = renderIcon();
        const headerNode = renderHeader();
        const bodyNode = renderBody();
        const footerNode = renderFooter();

        return (
          <div style={modalStyle} {...modalProps}>
            <div class={`${props.prefixedClass}-content`}>
              {closeNode}
              {iconNode}
              {headerNode}
              {bodyNode}
              {footerNode}
            </div>
          </div>
        );
      }

      function renderMask() {
        if (props.mask) {
          return (
            <transition name={`${Inventory.prefix}-fade`}>
              <div
                class={`${props.prefixedClass}-mask`}
                vShow={animationReady.value && props.visible}
              ></div>
            </transition>
          );
        }
      }

      function renderWrap() {
        const modalNode = renderModal();

        return (
          <transition name={`${Inventory.prefix}-modal-zoom`}>
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

      function renderRoot() {
        const maskNode = renderMask();
        const wrapNode = renderWrap();

        return (
          <div class={`${props.prefixedClass}-root`}>
            {maskNode}
            {wrapNode}
          </div>
        );
      }

      const rootNode = renderRoot();

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
