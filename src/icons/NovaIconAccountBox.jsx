// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconAccountBox from '../../icons/entities/icon-account-box.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconAccountBox',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-account-box', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconAccountBox
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
