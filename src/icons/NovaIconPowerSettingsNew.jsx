// GENERATE BY yarn build-icon
// DO NOT EDIT IT MANUALLY

import iconPowerSettingsNew from '../../icons/entities/icon-power-settings-new.js';
import NovaIcon from '@/components/icon/NovaIcon.jsx';

export default {
  name: 'NovaIconPowerSettingsNew',
  isIcon: true,
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-power-settings-new', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconPowerSettingsNew
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
