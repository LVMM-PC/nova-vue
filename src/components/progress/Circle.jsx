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
    }
  },
  setup: props => {
    const percent = ref(props.percent);
    const width = props.width;
    const strokeWidth = props.strokeWidth;

    const bgStyle = reactive({
      ['stroke-dasharray']: `149.23 298.45`,
      ['stroke-dashoffset']: `0`,
      ['stroke-width']: percent.value === 0 ? `0` : `5`
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

    let timer;

    function calcBgSize() {
      clearTimeout(timer);

      const circumference = Math.PI * (width - strokeWidth);

      const bgSize = circumference * percent.value;
      const bgSizeText = Utils.twoDecimalPlaces(bgSize);
      const circumferenceText = Utils.twoDecimalPlaces(circumference);

      bgStyle['stroke-dasharray'] = `${bgSizeText} ${circumferenceText}`;

      if (percent.value === 0) {
        timer = setTimeout(() => {
          bgStyle['stroke-width'] = `0`;
        }, 200);
      } else {
        bgStyle['stroke-width'] = `5`;
      }
    }

    watchEffect(() => {
      percent.value = props.percent;
      calcBgSize();
    });

    return () => (
      <div
        class={`nova-progress nova-progress-circle nova-progress-status-active`}
      >
        <div class={`nova-progress-inner`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
          >
            <circle
              stroke-linecap="round"
              stroke={`#f5f5f5`}
              stroke-width={`5px`}
              fill="none"
              cx="50"
              cy="50"
              r="47.5"
            />
            <circle
              stroke-linecap="round"
              stroke={`#e38`}
              style={bgStyle}
              class={`nova-progress-bg`}
              fill="none"
              cx="50"
              cy="50"
              r="47.5"
            />
          </svg>
          <div class={`nova-progress-text`}>{percentFormatted.value}</div>
        </div>
      </div>
    );
  }
};
