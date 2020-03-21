import iconVue from './template/icon-vue';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import {
  camelCaseToParamCase,
  camelCaseToPascalCase,
  paramCaseToCamelCase,
  sleep
} from '../utils';
import Storage from '../../src/utils/storage';
import * as iconIndex from '../../icons/index.js';
import del from 'del';

const prettierConfigPath = '../../.prettierrc';
const fsPromises = fs.promises;
const fileOption = {
  encoding: 'utf8'
};

async function main() {
  await del(['src/icons']);

  const iconPath = path.resolve(__dirname, `../../src/icons`);

  await sleep(1000);

  if (!fs.existsSync(iconPath)) {
    await fsPromises.mkdir(iconPath, { recursive: true });
  }

  Promise.all(
    Object.keys(iconIndex).map(iconName => {
      return generateIconComponents(iconPath, iconName);
    })
  ).then(() => {
    console.log('ICON GENERATE FINISHED');
  });
}

async function generateIconComponents(iconPath, iconName) {
  const iconClassName = `${Storage.prefix}-${camelCaseToParamCase(iconName)}`;
  const componentName = `${camelCaseToPascalCase(
    paramCaseToCamelCase(iconClassName)
  )}`;
  let text = iconVue(iconName, componentName, iconClassName);
  const defaultOptionBuffer = await fsPromises.readFile(
    path.resolve(__dirname, prettierConfigPath)
  );
  const defaultOptions = JSON.parse(defaultOptionBuffer.toString());
  const options = Object.assign({}, defaultOptions, { parser: 'babel' });
  const formattedContent = prettier.format(text, options);

  await fsPromises.writeFile(
    path.resolve(`${iconPath}`, `${componentName}.jsx`),
    formattedContent,
    fileOption
  );
}

main().then(_ => _);
