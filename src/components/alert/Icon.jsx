import Storage from '@/utils/storage';
import NovaIconCheckCircle from '@/icons/NovaIconCheckCircle';
import NovaIconError from '@/icons/NovaIconError';
import NovaIconInfo from '@/icons/NovaIconInfo';
import NovaIconHelp from '@/icons/NovaIconHelp';
import NovaIconCancel from '@/icons/NovaIconCancel';

export default {
  name: 'Icon',
  props: {
    prefixedClass: {
      type: String,
      default: `${Storage.prefix}-alert`
    },
    type: {
      type: String,
      default: ''
    }
  },
  render() {
    const { $attrs, $listeners, prefixedClass, type } = this;

    const classList = [
      `${prefixedClass}-icon`,
      `${prefixedClass}-icon-${type}`
    ];

    const iconProps = {
      class: classList,
      attrs: {
        ...$attrs
      },
      on: {
        ...$listeners
      }
    };

    let innerIconNode;
    switch (type) {
      case 'success':
        innerIconNode = <NovaIconCheckCircle />;
        break;
      case 'warning':
        innerIconNode = <NovaIconError />;
        break;
      case 'info':
        innerIconNode = <NovaIconInfo />;
        break;
      case 'error':
        innerIconNode = <NovaIconCancel />;
        break;
      case 'help':
        innerIconNode = <NovaIconHelp />;
        break;
    }

    return <span {...iconProps}>{innerIconNode}</span>;
  }
};
