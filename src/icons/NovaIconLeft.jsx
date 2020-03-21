// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconLeft from '../../icons/entities/icon-left.js';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconLeft',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-left', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconLeft
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
