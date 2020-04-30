// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconLock from '../../icons/entities/icon-lock.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconLock',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-lock', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconLock
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
