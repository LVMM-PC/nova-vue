// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconWarning from '../../icons/entities/icon-warning.js';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconWarning',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-warning', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconWarning
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
