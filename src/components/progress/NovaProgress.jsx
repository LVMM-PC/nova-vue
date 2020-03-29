import { createElement } from '@vue/composition-api';
import Line from '@/components/progress/Line.jsx';
import Circle from '@/components/progress/Circle.jsx';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'NovaProgress',
  props: {
    type: {
      type: String,
      default: 'line'
    },
    width: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  setup: props => {
    if (props.type === 'line') {
      return () => <Line percent={props.percent} />;
    } else if (props.type === 'circle') {
      return () => <Circle percent={props.percent} />;
    }
  }
};
