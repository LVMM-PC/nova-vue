// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconRemoveCircle from '../../icons/entities/icon-remove-circle.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconRemoveCircle',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-remove-circle', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconRemoveCircle
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
