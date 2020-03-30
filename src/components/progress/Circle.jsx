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
  name: 'ProgressCircle',
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-progress`
    },
    width: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    percent: {
      type: Number,
      default: 0
    },
    showInfo: {
      type: Boolean,
      default: true
    },
    strokeLinecap: {
      type: String,
      default: 'butt'
    }
  },
  setup: (props, context) => {
    const state = reactive({
      prefixedClass: props.prefixedClass,
      showInfo: props.showInfo,
      strokeLinecap: props.strokeLinecap,

      width: Utils.numberLimit(props.width, 0),
      strokeWidth: Utils.numberLimit(props.strokeWidth, 0, props.width / 2),
      halfWidth: computed(() => {
        return state.width / 2;
      }),
      radius: computed(() => {
        return (state.width - state.strokeWidth) / 2;
      }),
      circumference: computed(() => {
        return Math.PI * (state.width - state.strokeWidth);
      }),

      percent: Utils.numberLimit(props.percent, 0, 1),
      percentFormatted: computed(() => {
        return `${Utils.twoDecimalPlaces(state.percent * 100)}%`;
      })
    });

    const innerStyle = reactive({
      width: `${state.width}px`,
      height: `${state.width}px`
    });

    const bgStyle = reactive({
      ['stroke-dasharray']: getDasharray(state.percent),
      ['stroke-width']: state.percent === 0 ? `0` : state.strokeWidth
    });

    const circleClassList = computed(() => [
      state.prefixedClass,
      `${state.prefixedClass}-circle`,
      {
        [`${state.prefixedClass}-show-info`]: state.showInfo
      }
    ]);

    function getDasharray(percent) {
      const circumference = state.circumference;
      const bgLength = circumference * percent;
      const bgLengthText = Utils.twoDecimalPlaces(bgLength);
      const circumferenceText = Utils.twoDecimalPlaces(circumference);

      return `${bgLengthText} ${circumferenceText}`;
    }

    let timer;

    function updateBgStyle() {
      clearTimeout(timer);

      bgStyle['stroke-dasharray'] = getDasharray(state.percent);

      if (state.percent === 0) {
        timer = setTimeout(() => {
          bgStyle['stroke-width'] = `0`;
        }, 200);
      } else {
        bgStyle['stroke-width'] = state.strokeWidth;
      }
    }

    function updateInnerStyle() {
      const widthPixels = `${state.width}px`;
      innerStyle['width'] = widthPixels;
      innerStyle['height'] = widthPixels;
    }

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
      state.showInfo = props.showInfo;
      state.strokeLinecap = props.strokeLinecap;
      state.percent = Utils.numberLimit(props.percent, 0, 1);

      const width = props.width;
      state.width = Utils.numberLimit(width, 0);
      state.strokeWidth = Utils.numberLimit(props.strokeWidth, 0, width / 2);

      updateBgStyle();
      updateInnerStyle();
    });

    return () => (
      <div class={circleClassList.value} {...context}>
        <div class={`${state.prefixedClass}-inner`} style={innerStyle}>
          <svg
            class={`${state.prefixedClass}-svg`}
            width={state.width}
            height={state.width}
            viewBox={`0 0 ${state.width} ${state.width}`}
          >
            <circle
              class={`${state.prefixedClass}-trail`}
              stroke-linecap={state.strokeLinecap}
              stroke-width={state.strokeWidth}
              cx={state.halfWidth}
              cy={state.halfWidth}
              r={state.radius}
            />
            <circle
              class={`${state.prefixedClass}-bg`}
              stroke-dashoffset="0"
              stroke-linecap={state.strokeLinecap}
              style={bgStyle}
              cx={state.halfWidth}
              cy={state.halfWidth}
              r={state.radius}
            />
          </svg>
          {textNode.value}
        </div>
      </div>
    );
  }
};
