// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconExitToApp from '../../icons/entities/icon-exit-to-app.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconExitToApp',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-exit-to-app', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconExitToApp
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
