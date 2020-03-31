// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconRemove from '../../icons/entities/icon-remove.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconRemove',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-remove', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconRemove
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
