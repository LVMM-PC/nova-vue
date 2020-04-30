// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconLaunch from '../../icons/entities/icon-launch.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconLaunch',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-launch', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconLaunch
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
