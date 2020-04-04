import Inventory from '@/utils/inventory';
import { localeProps } from '@/uses/locale';

export default {
  ...localeProps,
  prefixedClass: {
    type: String,
    default: `${Inventory.prefix}-modal`
  },
  appendToBody: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: null
  },
  width: {
    type: [Number, String],
    default: 400
  },
  wrapClass: {
    type: [String, Array, Object],
    default: null
  },
  closable: {
    type: Boolean,
    default: true
  },
  mask: {
    type: Boolean,
    default: true
  },
  confirmLoading: {
    type: Boolean,
    default: false
  },
  visibleOk: {
    type: Boolean,
    default: true
  },
  okText: {
    type: String,
    default: null
  },
  okType: {
    type: String,
    default: 'secondary'
  },
  okButtonProps: {
    type: Object,
    default: null
  },
  visibleCancel: {
    type: Boolean,
    default: true
  },
  cancelText: {
    type: String,
    default: null
  },
  cancelType: {
    type: String,
    default: null
  },
  cancelButtonProps: {
    type: Object,
    default: null
  }
};
