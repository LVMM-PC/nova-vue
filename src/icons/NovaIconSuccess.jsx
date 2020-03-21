import iconSuccess from '../../icons/entities/icon-success.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconSuccess',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconSuccess
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
