import iconDateRange from '../../icons/entities/icon-date-range.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconDateRange',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      class: ['nova-icon-date-range', data.class],
      props: {
        ...data.props,
        ...props,
        src: iconDateRange
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
