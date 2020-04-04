import NovaModal from '@/components/modal/NovaModal';
import { createElement, reactive } from '@vue/composition-api';
import modalProps from './modal-props';
import Props from '@/utils/props';
import NovaIconHelp from '@/icons/NovaIconHelp';
import Inventory from '@/utils/inventory';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'NovaModalConfirm',
  props: {
    ...modalProps,
    close: {
      type: Function,
      default: null
    },
    onOk: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    },
    content: {
      type: [String, Object, Function],
      default: null
    },
    icon: {
      type: [Object, Function],
      default: () => {
        return () => <NovaIconHelp />;
      }
    },
    maskClosable: {
      type: Boolean,
      default: false
    },
    className: {
      type: [String, Array, Object],
      default: `${Inventory.prefix}-modal-confirm-confirm`
    }
  },
  setup: (props, context) => {
    const state = reactive({
      visible: true
    });
    const { attrs, listeners } = context;

    function close() {
      state.visible = false;
      setTimeout(() => {
        props.close.call(undefined);
      }, 200);
    }

    function onOk() {
      const returnValue = props.onOk.call(undefined);

      Promise.resolve(returnValue).then(() => {
        close();
      });
    }

    function onCancel() {
      const returnValue = props.onCancel.call(undefined);

      Promise.resolve(returnValue).then(() => {
        close();
      });
    }

    return () => {
      function renderContent() {
        return Props.vNodeStandardize(props.content);
      }

      const modalProps = {
        props: {
          ...props,
          appendToBody: false,
          className: [`${props.prefixedClass}-confirm`, props.className]
        },
        attrs,
        on: {
          ...listeners,
          ok: onOk,
          cancel: onCancel
        }
      };

      const contentNode = renderContent();

      return (
        <NovaModal {...modalProps} visible={state.visible}>
          {contentNode}
        </NovaModal>
      );
    };
  }
};
