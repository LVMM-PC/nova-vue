// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconNoteAdd from '../../icons/entities/icon-note-add.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconNoteAdd',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-note-add', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconNoteAdd
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
