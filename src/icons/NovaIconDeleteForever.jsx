// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconDeleteForever from '../../icons/entities/icon-delete-forever.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconDeleteForever',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-delete-forever', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconDeleteForever
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
