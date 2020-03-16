export class Utils {
  static sleep = (timeout = 0) => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, timeout);
    });
  };
}
