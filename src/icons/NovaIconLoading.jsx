// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconLoading from '../../icons/entities/icon-loading.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconLoading',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-loading', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconLoading
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
