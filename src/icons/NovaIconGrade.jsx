// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconGrade from '../../icons/entities/icon-grade.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconGrade',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-grade', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconGrade
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
