// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconDateRange from '../../icons/entities/icon-date-range.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconDateRange',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-date-range', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconDateRange
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
