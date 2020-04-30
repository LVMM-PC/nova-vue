// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconDelete from '../../icons/entities/icon-delete.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconDelete',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-delete', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconDelete
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
