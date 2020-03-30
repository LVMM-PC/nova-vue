import {
  computed,
  createElement,
  reactive,
  watchEffect
} from '@vue/composition-api';
import Utils from '@/utils/utils';
import Storage from '@/utils/storage';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'ProgressLine',
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-progress`
    },
    percent: {
      type: Number,
      default: 0
    },
    showInfo: {
      type: Boolean,
      default: true
    },
    status: {
      type: String,
      default: 'normal'
    }
  },
  setup: (props, context) => {
    const state = reactive({
      prefixedClass: props.prefixedClass,
      status: props.status,
      showInfo: props.showInfo,

      percent: Utils.numberLimit(props.percent, 0, 1),
      percentFormatted: computed(() => {
        return `${Utils.twoDecimalPlaces(state.percent * 100)}%`;
      })
    });

    const lineClassList = computed(() => [
      state.prefixedClass,
      `${state.prefixedClass}-line`,
      {
        [`${state.prefixedClass}-show-info`]: state.showInfo,
        [`${state.prefixedClass}-status-${state.status}`]: true
      }
    ]);

    let textNode = computed(() => {
      if (state.showInfo) {
        return (
          <div class={`${state.prefixedClass}-text`}>
            {state.percentFormatted}
          </div>
        );
      }
    });

    watchEffect(() => {
      state.prefixedClass = props.prefixedClass;
      state.status = props.status;
      state.showInfo = props.showInfo;
      state.percent = Utils.numberLimit(props.percent, 0, 1);
    });

    return () => (
      <div class={lineClassList.value} {...context}>
        <div class={`${state.prefixedClass}-outer`}>
          <div class={`${state.prefixedClass}-inner`}>
            <div
              class={`${state.prefixedClass}-bg`}
              style={{ width: state.percentFormatted }}
            />
          </div>
        </div>
        {textNode.value}
      </div>
    );
  }
};
