import iconLeft from '../../icons/entities/icon-left.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconLeft',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconLeft
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
