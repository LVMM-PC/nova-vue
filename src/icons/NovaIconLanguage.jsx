// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconLanguage from '../../icons/entities/icon-language.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconLanguage',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-language', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconLanguage
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
