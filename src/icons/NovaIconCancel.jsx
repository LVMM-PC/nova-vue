import iconCancel from '../../icons/entities/icon-cancel.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconCancel',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconCancel
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
