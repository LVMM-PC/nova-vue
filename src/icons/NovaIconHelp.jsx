import iconHelp from '../../icons/entities/icon-help.json';
import NovaIcon from '@/components/icon/NovaIcon';

export default {
  name: 'NovaIconHelp',
  functional: true,
  render(h, context) {
    const { data, props } = context;
    const iconProps = {
      ...data,
      props: {
        ...data.props,
        ...props,
        src: iconHelp
      }
    };
    return <NovaIcon {...iconProps} />;
  }
};
