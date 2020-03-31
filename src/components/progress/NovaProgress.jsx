import { createElement } from '@vue/composition-api';
import Line from '@/components/progress/Line.jsx';
import Circle from '@/components/progress/Circle.jsx';
import Storage from '@/utils/storage';

// eslint-disable-next-line no-unused-vars
const h = createElement;

export default {
  name: 'NovaProgress',
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-progress`
    },
    type: {
      type: String,
      default: 'line'
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
    },
    width: {
      type: Number,
      default: 100
    },
    strokeWidth: {
      type: Number,
      default: 5
    },
    strokeLinecap: {
      type: String,
      default: 'butt'
    }
  },
  setup: (props, context) => {
    const { listeners, attrs } = context;

    const progressProps = {
      props,
      attrs,
      on: listeners
    };

    if (props.type === 'line') {
      return () => <Line {...progressProps} />;
    } else if (props.type === 'circle') {
      return () => <Circle {...progressProps} />;
    }
  }
};
