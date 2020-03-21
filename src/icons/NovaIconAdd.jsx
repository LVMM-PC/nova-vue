// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconAdd from '../../icons/entities/icon-add.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconAdd',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-add', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconAdd
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
