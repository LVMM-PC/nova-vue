// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconClose from '../../icons/entities/icon-close.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconClose',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-close', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconClose
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
