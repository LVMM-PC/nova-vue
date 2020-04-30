// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconHome from '../../icons/entities/icon-home.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconHome',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-home', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconHome
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
