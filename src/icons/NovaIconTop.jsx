import iconTop from '../../icons/entities/icon-top.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconTop',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconTop
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
