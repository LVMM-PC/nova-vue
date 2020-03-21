import iconRemove from '../../icons/entities/icon-remove.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconRemove',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-remove', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconRemove
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
