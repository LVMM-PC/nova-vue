// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconAccountCircle from '../../icons/entities/icon-account-circle.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconAccountCircle',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-account-circle', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconAccountCircle
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
