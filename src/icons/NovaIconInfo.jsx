import iconInfo from '../../icons/entities/icon-info.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconInfo',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-info', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconInfo
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
