import iconClose from '../../icons/entities/icon-close.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconClose',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-close', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconClose
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
