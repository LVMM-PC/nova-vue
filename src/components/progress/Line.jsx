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
    const { attrs, listeners } = context;

    const state = reactive({
      percent: Utils.numberLimit(props.percent, 0, 1),
      percentFormatted: computed(() => {
        return `${Utils.twoDecimalPlaces(state.percent * 100)}%`;
      })
    });

    watchEffect(() => {
      state.percent = Utils.numberLimit(props.percent, 0, 1);
    });

    const lineClassList = computed(() => [
      props.prefixedClass,
      `${props.prefixedClass}-line`,
      {
        [`${props.prefixedClass}-show-info`]: props.showInfo,
        [`${props.prefixedClass}-status-${props.status}`]: true
      }
    ]);

    const lineProps = {
      attrs,
      on: listeners
    };

    return () => {
      function createOuter() {
        return (
          <div class={`${props.prefixedClass}-outer`}>
            <div class={`${props.prefixedClass}-inner`}>
              <div
                class={`${props.prefixedClass}-bg`}
                style={{ width: state.percentFormatted }}
              />
            </div>
          </div>
        );
      }

      function createText() {
        if (props.showInfo) {
          return (
            <div class={`${props.prefixedClass}-text`}>
              {state.percentFormatted}
            </div>
          );
        }
      }

      const outerNode = createOuter();
      const textNode = createText();

      return (
        <div class={lineClassList.value} {...lineProps}>
          {outerNode}
          {textNode}
        </div>
      );
    };
  }
};
