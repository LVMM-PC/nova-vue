const defaultMaxLength = 1024;

export default class Utils {
  /**
   * get element offset of stopElement
   * @param element DOM
   * @param stopElement Stop calc parent
   * @returns {{top: number, left: number}}
   */
  static getElementOffset(element, stopElement = null) {
    let left = 0;
    let top = 0;

    while (element) {
      left += element.offsetLeft;
      top += element.offsetTop;
      element = element.offsetParent;
      if (element === stopElement) {
        break;
      }
    }

    return {
      left,
      top
    };
  }

  static isParentsOrSelf(element, parentElement, maxLength = defaultMaxLength) {
    for (let i = 0; i < maxLength; i++) {
      if (element === parentElement) {
        return true;
      }
      if (!element) {
        return false;
      }

      element = element.parentElement;
    }

    return false;
  }

  /**
   * return element and his parentsElement until stopElement
   * @param element
   * @param stopElement
   * @param maxLength
   * @returns {[]} Include element, Not include stopElement
   */
  static getFamilyLink(element, stopElement, maxLength = defaultMaxLength) {
    let parents = [];
    for (let i = 0; i < maxLength; i++) {
      if (element === stopElement) {
        return parents;
      }

      if (!element) {
        return parents;
      }

      parents.push(element);
      element = element.parentElement;
    }

    return parents;
  }

  static mergeOptions(to, from) {
    for (const key in from) {
      if (!Object.prototype.hasOwnProperty.call(from, key)) {
        continue;
      }
      if (typeof from[key] === 'object') {
        if (typeof to[key] !== 'object') {
          to[key] = {};
        }
        Utils.mergeOptions(to[key], from[key]);
      } else {
        to[key] = from[key];
      }
    }
    return to;
  }

  static scrollTo(element, offset) {
    const { x = 0, y = 0 } = offset;
    if (element.scrollTo) {
      element.scrollTo(x, y);
    } else {
      element.scrollTop = y;
      element.scrollLeft = x;
    }
  }

  static hasClassName(element, className) {
    if (!element || !className) {
      return false;
    }

    const targetClassName = element.getAttribute('class');
    if (!targetClassName) {
      return false;
    }

    return targetClassName
      .split(' ')
      .some(singleClassName => singleClassName === className);
  }

  static twoDecimalPlaces(number) {
    return number.toFixed(2).replace(/(\.)?0+$/, '');
  }

  static numberLimit(number, low = -Infinity, high = Infinity) {
    if (number < low) {
      return low;
    }
    if (number > high) {
      return high;
    }
    return number;
  }

  static getRandomInt(low, high) {
    return Math.floor(low + Math.random() * (high - low));
  }
}
