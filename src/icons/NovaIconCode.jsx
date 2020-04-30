// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconCode from '../../icons/entities/icon-code.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconCode',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-code', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconCode
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
