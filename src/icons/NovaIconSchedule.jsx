// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconSchedule from '../../icons/entities/icon-schedule.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconSchedule',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-schedule', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconSchedule
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
