import bottom from '../../icons/json/bottom.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconBottom',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: bottom
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
