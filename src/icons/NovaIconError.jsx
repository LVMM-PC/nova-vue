import iconError from '../../icons/entities/icon-error.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconError',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-error', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconError
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
