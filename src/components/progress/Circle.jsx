import {
  computed,
  createElement,
  reactive,
  ref,
  watchEffect
} from '@vue/composition-api';
import Utils from '@/utils/utils';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'ProgressCircle',
  props: {
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
    const percent = ref(Utils.numberLimit(props.percent, 0, 1));

    const width = ref(Utils.numberLimit(props.width, 0));
    const halfWidth = computed(() => {
      return width.value / 2;
    });

    const strokeWidth = ref(
      Utils.numberLimit(props.strokeWidth, 0, width.value / 2)
    );

    const radius = computed(() => {
      return (width.value - strokeWidth.value) / 2;
    });

    const circumference = computed(() => {
      return Math.PI * (width.value - strokeWidth.value);
    });

    const innerStyle = reactive({
      width: `${width.value}px`,
      height: `${width.value}px`
    });

    const bgStyle = reactive({
      ['stroke-dasharray']: calcDashArray(percent.value),
      ['stroke-dashoffset']: `0`,
      ['stroke-width']: percent.value === 0 ? `0` : strokeWidth.value
    });

    const percentFormatted = computed(() => {
      let number = percent.value * 100;
      if (number < 0) {
        number = 0;
      }
      if (number > 100) {
        number = 100;
      }

      return `${Utils.twoDecimalPlaces(number)}%`;
    });

    const circleClassList = computed(() => [
      `nova-progress`,
      `nova-progress-circle`,
      {
        [`nova-progress-show-info`]: props.showInfo
      }
    ]);

    function calcDashArray(percentValue) {
      const bgSize = circumference.value * percentValue;
      const bgSizeText = Utils.twoDecimalPlaces(bgSize);
      const circumferenceText = Utils.twoDecimalPlaces(circumference.value);

      return `${bgSizeText} ${circumferenceText}`;
    }

    let timer;

    function calcBgSize() {
      clearTimeout(timer);

      bgStyle['stroke-dasharray'] = calcDashArray(percent.value);

      if (percent.value === 0) {
        timer = setTimeout(() => {
          bgStyle['stroke-width'] = `0`;
        }, 200);
      } else {
        bgStyle['stroke-width'] = strokeWidth.value;
      }
    }

    function updateInnerStyle() {
      const widthPixels = `${width.value}px`;
      innerStyle['width'] = widthPixels;
      innerStyle['height'] = widthPixels;
    }

    let textNode = computed(() => {
      if (props.showInfo) {
        return <div class={`nova-progress-text`}>{percentFormatted.value}</div>;
      }
    });

    watchEffect(() => {
      const newPercent = Utils.numberLimit(props.percent, 0, 1);
      percent.value = newPercent;

      const newWidth = Utils.numberLimit(props.width, 0);
      width.value = newWidth;

      const newStrokeWidth = Utils.numberLimit(
        props.strokeWidth,
        0,
        newWidth / 2
      );
      strokeWidth.value = newStrokeWidth;

      calcBgSize();
      updateInnerStyle();
    });

    return () => (
      <div class={circleClassList.value} {...context}>
        <div class={`nova-progress-inner`} style={innerStyle}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width.value}
            height={width.value}
            viewBox={`0 0 ${width.value} ${width.value}`}
          >
            <circle
              stroke-linecap={props.strokeLinecap}
              stroke-width={strokeWidth.value}
              class={`nova-progress-trail`}
              cx={halfWidth.value}
              cy={halfWidth.value}
              r={radius.value}
            />
            <circle
              stroke-linecap={props.strokeLinecap}
              style={bgStyle}
              class={`nova-progress-bg`}
              cx={halfWidth.value}
              cy={halfWidth.value}
              r={radius.value}
            />
          </svg>
          {textNode.value}
        </div>
      </div>
    );
  }
};
