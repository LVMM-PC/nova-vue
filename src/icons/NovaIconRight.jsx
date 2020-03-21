// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconRight from '../../icons/entities/icon-right.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconRight',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-right', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconRight
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
