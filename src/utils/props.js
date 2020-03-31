export default class Props {
  static isBooleanPropsTrue(prop) {
    switch (typeof prop) {
      case 'string':
        return true;
      default:
        return !!prop;
    }
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
