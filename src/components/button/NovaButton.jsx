import { computed, createElement } from '@vue/composition-api';
import Inventory from '../../utils/inventory';
import NovaIconLoading from '@/icons/NovaIconLoading.jsx';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'NovaButton',
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-button`
    },
    type: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    danger: {
      type: Boolean,
      default: false
    },
    block: {
      type: Boolean,
      default: false
    },
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  setup: (props, context) => {
    const { attrs, listeners, emit, slots } = context;

    const buttonClassList = computed(() => {
      return [
        props.prefixedClass,
        {
          [`${props.prefixedClass}-${props.type}`]: true,
          [`${props.prefixedClass}-icon-only`]: slots.icon && !slots.default,
          [`${props.prefixedClass}-loading`]: props.loading,
          [`${props.prefixedClass}-danger`]: props.danger,
          [`${props.prefixedClass}-block`]: props.block
        }
      ];
    });

    const buttonProps = {
      attrs,
      on: {
        ...listeners,
        click: handleClick
      }
    };

    function handleClick(...args) {
      if (props.loading || props.disabled) {
        return;
      }

      emit('click', ...args);
    }

    return () => {
      function renderLoading() {
        if (props.loading) {
          return <NovaIconLoading spin />;
        }
      }

      function renderIcon() {
        const loadingNode = renderLoading();
        const icon = slots.icon?.();

        return loadingNode || icon;
      }

      function trim(textNode) {
        if (typeof textNode.text === 'string') {
          const text = textNode.text.trim();
          return <span>{text}</span>;
        } else {
          return textNode;
        }
      }

      function renderChildren() {
        const slotDefault = slots.default?.();

        if (slotDefault?.length === 1) {
          return trim(slotDefault[0]);
        } else {
          return slotDefault;
        }
      }

      const iconNode = renderIcon();
      const children = renderChildren();

      function renderLink() {
        return (
          <a
            class={buttonClassList.value}
            disabled={props.disabled}
            {...buttonProps}
          >
            {iconNode}
            {children}
          </a>
        );
      }

      function renderButton() {
        return (
          <button
            class={buttonClassList.value}
            disabled={props.disabled}
            type={props.htmlType}
            {...buttonProps}
          >
            {iconNode}
            {children}
          </button>
        );
      }

      if (attrs.href) {
        const linkNode = renderLink();
        return linkNode;
      }

      const buttonNode = renderButton();
      return buttonNode;
    };
  }
};
