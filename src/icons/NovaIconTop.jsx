// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconTop from '../../icons/entities/icon-top.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconTop',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-top', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconTop
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
