import iconCancel from '../../icons/entities/icon-cancel.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconCancel',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-cancel', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconCancel
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
