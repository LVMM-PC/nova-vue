import iconVue from './template/icon-vue';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { camelCaseToPascalCase, paramCaseToCamelCase } from '../utils';
import Storage from '../../src/utils/storage';
import * as iconIndex from '../../icons/index.js';

const prettierConfigPath = '../../.prettierrc';
const fsPromises = fs.promises;
const fileOption = {
  encoding: 'utf8'
};

Promise.all(
  Object.keys(iconIndex).map(iconName => {
    return main(iconName);
  })
).then(() => {
  console.log('ICON GENERATE FINISHED');
});

async function main(iconName) {
  const componentName = `${camelCaseToPascalCase(
    paramCaseToCamelCase(`${Storage.prefix}-${iconName}`)
  )}`;
  let text = iconVue(iconName, componentName);
  const defaultOptionBuffer = await fsPromises.readFile(
    path.resolve(__dirname, prettierConfigPath)
  );
  const defaultOptions = JSON.parse(defaultOptionBuffer.toString());
  const options = Object.assign({}, defaultOptions, { parser: 'babel' });
  const formattedContent = prettier.format(text, options);
  await fsPromises.writeFile(
    path.resolve(__dirname, `../../src/icons/${componentName}.jsx`),
    formattedContent,
    fileOption
  );
}
