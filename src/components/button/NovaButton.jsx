import {
  computed,
  createElement,
  reactive,
  watchEffect
} from '@vue/composition-api';
import Storage from '@/utils/storage';

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
    htmlType: {
      type: String,
      default: 'button'
    }
  },
  setup: (props, context) => {
    const state = reactive({
      prefixedClass: props.prefixedClass,
      type: props.type,
      disabled: props.disabled,
      loading: props.loading,
      htmlType: props.htmlType
    });

    const children = context.slots.default;

    const buttonClassList = computed(() => {
      return [
        state.prefixedClass,
        {
          [`${state.prefixedClass}-${state.type}`]: true,
          [`${state.prefixedClass}-loading`]: state.loading
        }
      ];
    });

    watchEffect(() => {
      state.prefixedClass = props.prefixedClass;
      state.type = props.type;
      state.disabled = props.disabled;
      state.loading = props.loading;
      state.htmlType = props.htmlType;
    });

    return () => (
      <button
        class={buttonClassList.value}
        type={state.htmlType}
        disabled={state.disabled}
      >
        {children()}
      </button>
    );
  }
};
