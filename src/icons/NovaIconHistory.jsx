// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconHistory from '../../icons/entities/icon-history.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconHistory',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-history', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconHistory
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
