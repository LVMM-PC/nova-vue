// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconGetApp from '../../icons/entities/icon-get-app.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconGetApp',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-get-app', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconGetApp
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
