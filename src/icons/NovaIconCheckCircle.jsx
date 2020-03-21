import iconCheckCircle from '../../icons/entities/icon-check-circle.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconCheckCircle',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconCheckCircle
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
