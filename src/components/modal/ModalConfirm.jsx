import { createElement, reactive } from '@vue/composition-api';
import Props from '@/utils/props';
import Inventory from '@/utils/inventory';
import NovaModal from '@/components/modal/NovaModal.jsx';
import NovaIconHelp from '@/icons/NovaIconHelp.jsx';
import modalProps from './modal-props';

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
    const { attrs, listeners } = context;

    const state = reactive({
      visible: true
    });

    function close() {
      state.visible = false;

      setTimeout(() => {
        props.close.call(undefined);
      }, 200);
    }

    function onOk(e) {
      const returnValue = props.onOk.call(undefined, e);

      Promise.resolve(returnValue).then(() => {
        close();
      });
    }

    function onCancel(e) {
      const returnValue = props.onCancel.call(undefined, e);

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
