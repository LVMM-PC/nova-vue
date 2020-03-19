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
    return vNode?.componentOptions?.Ctor?.options;
  }

  static getVNodeProps(vNode) {
    return vNode?.componentOptions?.propsData;
  }

  static getVNodeInstance(vNode) {
    return vNode?.componentInstance;
  }
}
