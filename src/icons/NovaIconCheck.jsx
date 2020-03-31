// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconCheck from '../../icons/entities/icon-check.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconCheck',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-check', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconCheck
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
