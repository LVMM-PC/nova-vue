// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconRoom from '../../icons/entities/icon-room.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconRoom',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-room', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconRoom
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
