import { computed, createElement } from '@vue/composition-api';
import Storage from '@/utils/storage';
import NovaIconLoading from '@/icons/NovaIconLoading';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'NovaButton',
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-button`
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
        click: handleClick,
        ...listeners
      }
    };

    function handleClick(...args) {
      if (props.loading || props.disabled) {
        return;
      }

      emit('click', ...args);
    }

    return () => {
      function createLoading() {
        if (props.loading) {
          return <NovaIconLoading spin />;
        }
      }

      function createIcon() {
        const loadingNode = createLoading();
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

      function createChildren() {
        const slotDefault = slots.default?.();

        if (slotDefault?.length === 1) {
          return trim(slotDefault[0]);
        } else {
          return slotDefault;
        }
      }

      const iconNode = createIcon();
      const children = createChildren();

      function createLink() {
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

      function createButton() {
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
        const linkNode = createLink();
        return linkNode;
      }

      const buttonNode = createButton();
      return buttonNode;
    };
  }
};
