// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconSearch from '../../icons/entities/icon-search.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconSearch',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-search', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconSearch
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
