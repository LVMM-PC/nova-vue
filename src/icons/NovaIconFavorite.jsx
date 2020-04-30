// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconFavorite from '../../icons/entities/icon-favorite.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconFavorite',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-favorite', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconFavorite
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
