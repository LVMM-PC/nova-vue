import path from 'path';

export function fromTheRoot(p) {
  const projectRootDir = path.resolve(__dirname, '..');
  return path.join(projectRootDir, p);
}

export function paramCaseToCamelCase(paramCaseStr) {
  return paramCaseStr
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word;
      } else {
        return `${word[0].toUpperCase()}${word.slice(1)}`;
      }
    })
    .join('');
}

export function camelCaseToPascalCase(camelCaseStr) {
  return `${camelCaseStr[0].toUpperCase()}${camelCaseStr.slice(1)}`;
}

export function camelCaseToParamCase(camelCaseStr) {
  return camelCaseStr.replace(/([A-Z])/g, (match, p1) => {
    return `-${p1.toLowerCase()}`;
  });
}

export function sleep(timeout = 0) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, timeout);
  });
}
