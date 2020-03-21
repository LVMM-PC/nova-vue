import iconAddCircle from '../../icons/entities/icon-add-circle.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconAddCircle',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconAddCircle
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
