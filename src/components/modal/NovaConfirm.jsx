import Vue from 'vue';
import { createElement } from '@vue/composition-api';
import Inventory from '@/utils/inventory';
import ModalConfirm from '@/components/modal/ModalConfirm.jsx';
import NovaIconInfo from '@/icons/NovaIconInfo.jsx';
import NovaIconCheckCircle from '@/icons/NovaIconCheckCircle.jsx';
import NovaIconCancel from '@/icons/NovaIconCancel.jsx';
import NovaIconError from '@/icons/NovaIconError.jsx';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export function confirm(props) {
  const divElement = document.createElement('div');
  const targetElement = document.createElement('div');
  divElement.appendChild(targetElement);
  document.body.appendChild(divElement);

  const propsRef = {
    props: {
      close,
      ...props
    }
  };

  let confirmInstance = render();

  function close() {
    confirmInstance?.$destroy();
    confirmInstance = null;
    divElement.parentNode?.removeChild(divElement);
  }

  function render() {
    return new Vue({
      data() {
        return { propsRef };
      },
      render(h) {
        const confirmOptions = { ...this.propsRef };
        return h(ModalConfirm, confirmOptions);
      }
    }).$mount(targetElement);
  }

  return {
    destroy: close,
    update: props => {
      propsRef.props = {
        ...propsRef.props,
        ...props
      };
    }
  };
}

export function info(props) {
  return confirm({
    ...props,
    className: `${Inventory.prefix}-modal-confirm-info`,
    visibleCancel: false,
    icon: () => <NovaIconInfo />
  });
}

export function success(props) {
  return confirm({
    ...props,
    className: `${Inventory.prefix}-modal-confirm-success`,
    visibleCancel: false,
    icon: () => <NovaIconCheckCircle />
  });
}

export function error(props) {
  return confirm({
    ...props,
    className: `${Inventory.prefix}-modal-confirm-error`,
    visibleCancel: false,
    icon: () => <NovaIconCancel />
  });
}

export function warning(props) {
  return confirm({
    ...props,
    className: `${Inventory.prefix}-modal-confirm-warning`,
    visibleCancel: false,
    icon: () => <NovaIconError />
  });
}

export default class NovaConfirm {
  constructor() {
    throw new Error('Using static methods instead!');
  }

  static confirm = confirm;
  static info = info;
  static success = success;
  static error = error;
  static warning = warning;
}
