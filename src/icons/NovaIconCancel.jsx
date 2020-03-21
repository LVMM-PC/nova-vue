// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconCancel from '../../icons/entities/icon-cancel.js';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconCancel',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-cancel', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconCancel
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
