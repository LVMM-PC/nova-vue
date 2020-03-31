// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconAddCircle from '../../icons/entities/icon-add-circle.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconAddCircle',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-add-circle', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconAddCircle
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
