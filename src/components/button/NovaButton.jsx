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

    function handleClick(...args) {
      if (props.loading || props.disabled) {
        return;
      }

      emit('click', ...args);
    }

    const iconLoadingNode = computed(() => {
      if (props.loading) {
        return <NovaIconLoading spin />;
      }
    });

    function trimSpace(textNode) {
      if (typeof textNode.text === 'string') {
        const text = textNode.text.trim();
        return <span>{text}</span>;
      } else {
        return textNode;
      }
    }

    const buttonProps = {
      attrs,
      on: {
        click: handleClick,
        ...listeners
      }
    };

    return () => {
      let icon;
      if (slots.icon) {
        icon = slots.icon();
      }

      let children;
      if (slots.default) {
        const slotDefault = slots.default();
        if (slotDefault.length === 1) {
          children = trimSpace(slotDefault[0]);
        } else {
          children = slotDefault;
        }
      }

      if (attrs.href) {
        return (
          <a
            class={buttonClassList.value}
            disabled={props.disabled}
            {...buttonProps}
          >
            {iconLoadingNode.value || icon}
            {children}
          </a>
        );
      }

      return (
        <button
          class={buttonClassList.value}
          disabled={props.disabled}
          type={props.htmlType}
          {...buttonProps}
        >
          {iconLoadingNode.value || icon}
          {children}
        </button>
      );
    };
  }
};
