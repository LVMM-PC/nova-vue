// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconCached from '../../icons/entities/icon-cached.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconCached',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-cached', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconCached
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
