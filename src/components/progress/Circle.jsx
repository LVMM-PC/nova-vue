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
    const { attrs, listeners } = context;

    const state = reactive({
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

    watchEffect(() => {
      state.percent = Utils.numberLimit(props.percent, 0, 1);

      const width = props.width;
      state.width = Utils.numberLimit(width, 0);
      state.strokeWidth = Utils.numberLimit(props.strokeWidth, 0, width / 2);

      updateBgStyle();
      updateInnerStyle();
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
      props.prefixedClass,
      `${props.prefixedClass}-circle`,
      {
        [`${props.prefixedClass}-show-info`]: props.showInfo
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

    const circleProps = {
      attrs,
      on: listeners
    };

    return () => {
      function createBg() {
        return (
          <circle
            class={`${props.prefixedClass}-bg`}
            stroke-dashoffset="0"
            stroke-linecap={props.strokeLinecap}
            style={bgStyle}
            cx={state.halfWidth}
            cy={state.halfWidth}
            r={state.radius}
          />
        );
      }

      function createTrail() {
        return (
          <circle
            class={`${props.prefixedClass}-trail`}
            stroke-linecap={props.strokeLinecap}
            stroke-width={state.strokeWidth}
            cx={state.halfWidth}
            cy={state.halfWidth}
            r={state.radius}
          />
        );
      }

      function createSvg() {
        const trailNode = createTrail();
        const bgNode = createBg();

        return (
          <svg
            class={`${props.prefixedClass}-svg`}
            width={state.width}
            height={state.width}
            viewBox={`0 0 ${state.width} ${state.width}`}
          >
            {trailNode}
            {bgNode}
          </svg>
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

      const svgNode = createSvg();
      const textNode = createText();

      return (
        <div class={circleClassList.value} {...circleProps}>
          <div class={`${props.prefixedClass}-inner`} style={innerStyle}>
            {svgNode}
            {textNode}
          </div>
        </div>
      );
    };
  }
};
