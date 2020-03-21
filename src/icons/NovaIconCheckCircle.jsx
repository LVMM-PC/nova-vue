// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconCheckCircle from '../../icons/entities/icon-check-circle.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconCheckCircle',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-check-circle', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconCheckCircle
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
