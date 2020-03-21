import iconRight from '../../icons/entities/icon-right.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconRight',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconRight
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
