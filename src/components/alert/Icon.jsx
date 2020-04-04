import Inventory from '../../utils/inventory';
import NovaIconCheckCircle from '@/icons/NovaIconCheckCircle.jsx';
import NovaIconError from '@/icons/NovaIconError.jsx';
import NovaIconInfo from '@/icons/NovaIconInfo.jsx';
import NovaIconHelp from '@/icons/NovaIconHelp.jsx';
import NovaIconCancel from '@/icons/NovaIconCancel.jsx';

export default {
  name: 'AlertIcon',
  props: {
    prefixedClass: {
      type: String,
      default: `${Inventory.prefix}-alert`
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
