import iconAdd from '../../icons/entities/icon-add.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconAdd',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconAdd
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
