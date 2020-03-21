import iconWarning from '../../icons/entities/icon-warning.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconWarning',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconWarning
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
