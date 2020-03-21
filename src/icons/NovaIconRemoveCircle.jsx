import iconRemoveCircle from '../../icons/entities/icon-remove-circle.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconRemoveCircle',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-remove-circle', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconRemoveCircle
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
