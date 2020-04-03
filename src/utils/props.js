export default class Props {
  static styleLengthStandardize(length) {
    if (typeof length === 'number') {
      return `${length}px`;
    }

    return length;
  }

  static booleanStandardize(prop) {
    if (typeof prop === 'string') {
      return true;
    }

    return !!prop;
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
