import iconInfo from '../../icons/entities/icon-info.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconInfo',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconInfo
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
