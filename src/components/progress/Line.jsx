import {
  ref,
  createElement,
  watchEffect,
  computed
} from '@vue/composition-api';
import Utils from '@/utils/utils';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'ProgressLine',
  props: {
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
    const percent = ref(props.percent);

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

    const lineClassList = computed(() => [
      `nova-progress`,
      `nova-progress-line`,
      {
        [`nova-progress-show-info`]: props.showInfo,
        [`nova-progress-status-${props.status}`]: true
      }
    ]);

    let textNode = computed(() => {
      if (props.showInfo) {
        return <div class={`nova-progress-text`}>{percentFormatted.value}</div>;
      }
    });

    watchEffect(() => {
      percent.value = props.percent;
    });

    return () => (
      <div class={lineClassList.value} {...context}>
        <div class={`nova-progress-outer`}>
          <div class={`nova-progress-inner`}>
            <div
              class={`nova-progress-bg`}
              style={{ width: percentFormatted.value }}
            />
          </div>
        </div>
        {textNode.value}
      </div>
    );
  }
};
