import iconCalendar from '../../icons/entities/icon-calendar.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconCalendar',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconCalendar
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
