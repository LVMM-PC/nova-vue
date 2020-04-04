import Utils from '@/utils/utils';

export default class Props {
  static styleLengthStandardize(length) {
    if (typeof length === 'number') {
      return `${length}px`;
    }

    return length;
  }

  static booleanStandardize(value) {
    if (typeof value === 'string') {
      return true;
    }

    return !!value;
  }

  static vNodeStandardize(vNode) {
    if (Utils.isFunction(vNode)) {
      return vNode.call(undefined);
    }

    return vNode;
  }

  static getVNodeOptions(vNode) {
    if (vNode.fnOptions) {
      return vNode.fnOptions;
    }
    return vNode?.componentOptions?.Ctor?.options;
  }

  static getVNodeProps(vNode) {
    return vNode?.componentOptions?.propsData;
  }

  static getVNodeInstance(vNode) {
    return vNode?.componentInstance;
  }
}
