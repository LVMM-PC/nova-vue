import Vue from 'vue';
import ModalConfirm from '@/components/modal/ModalConfirm';
import NovaIconInfo from '@/icons/NovaIconInfo';
import NovaIconCheckCircle from '@/icons/NovaIconCheckCircle';
import NovaIconCancel from '@/icons/NovaIconCancel';
import NovaIconError from '@/icons/NovaIconError';
import { createElement } from '@vue/composition-api';
import Inventory from '@/utils/inventory';

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
    confirmInstance.$destroy();
    confirmInstance = null;
    divElement.parentNode.removeChild(divElement);
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
  confirm({
    ...props,
    className: `${Inventory.prefix}-modal-confirm-info`,
    icon: () => <NovaIconInfo />,
    visibleCancel: false
  });
}

export function success(props) {
  confirm({
    ...props,
    className: `${Inventory.prefix}-modal-confirm-success`,
    icon: () => <NovaIconCheckCircle />,
    visibleCancel: false
  });
}

export function error(props) {
  confirm({
    ...props,
    className: `${Inventory.prefix}-modal-confirm-error`,
    icon: () => <NovaIconCancel />,
    visibleCancel: false
  });
}

export function warning(props) {
  confirm({
    ...props,
    className: `${Inventory.prefix}-modal-confirm-warning`,
    icon: () => <NovaIconError />,
    visibleCancel: false
  });
}
