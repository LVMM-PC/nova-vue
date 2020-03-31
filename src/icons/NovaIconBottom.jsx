// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconBottom from '../../icons/entities/icon-bottom.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconBottom',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-bottom', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconBottom
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
