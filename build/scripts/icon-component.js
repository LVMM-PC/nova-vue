import iconVue from './template/icon-vue';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import {
  BANNER,
  camelCaseToParamCase,
  camelCaseToPascalCase,
  paramCaseToCamelCase,
  sleep
} from '../utils';
import * as iconIndex from '../../icons/index.js';
import del from 'del';
import iconList from './template/icon-list';

const prettierConfigPath = '../../.prettierrc';
const fsPromises = fs.promises;
const fileOption = {
  encoding: 'utf8'
};
const prefix = 'nova';
const iconListPath = path.resolve(
  __dirname,
  `../../docs/.vuepress/components/site/icon`
);

async function prettierFormat(text, overOptions = {}) {
  const defaultOptionBuffer = await fsPromises.readFile(
    path.resolve(__dirname, prettierConfigPath)
  );
  const defaultOptions = JSON.parse(defaultOptionBuffer.toString());
  const options = Object.assign(
    {},
    defaultOptions,
    { parser: 'babel' },
    overOptions
  );
  return prettier.format(text, options);
}

async function main() {
  await del(['src/icons']);

  const iconPath = path.resolve(__dirname, `../../src/icons`);

  await sleep(1000);

  if (!fs.existsSync(iconPath)) {
    await fsPromises.mkdir(iconPath, { recursive: true });
  }

  const iconNameList = Object.keys(iconIndex);
  await generateIconComponentIndex(iconPath, iconNameList);
  await generateIconList(iconNameList);

  Promise.all(
    iconNameList.map(iconName => {
      return generateIconComponents(iconPath, iconName);
    })
  ).then(() => {
    console.log('ICON GENERATE FINISHED');
  });
}

async function generateIconComponentIndex(iconPath, iconNameList) {
  let indexLineList = iconNameList.map(iconName => {
    const iconClassName = `${prefix}-${camelCaseToParamCase(iconName)}`;
    const componentName = `${camelCaseToPascalCase(
      paramCaseToCamelCase(iconClassName)
    )}`;

    return `export ${componentName} from './${componentName}.jsx';`;
  });

  const body = indexLineList.join('\n');
  const indexContent = `${BANNER}${body}`;

  const formattedContent = await prettierFormat(indexContent);

  await fsPromises.writeFile(
    path.resolve(`${iconPath}`, `index.js`),
    formattedContent,
    fileOption
  );
}

async function generateIconList(iconNameList) {
  const componentsNameList = iconNameList.map(iconName => {
    const iconClassName = `${prefix}-${camelCaseToParamCase(iconName)}`;
    return `${camelCaseToPascalCase(paramCaseToCamelCase(iconClassName))}`;
  });
  let text = iconList(componentsNameList);
  const formattedContent = await prettierFormat(text, {
    parser: 'vue'
  });

  await fsPromises.writeFile(
    path.resolve(`${iconListPath}`, 'list.vue'),
    formattedContent,
    fileOption
  );
}

async function generateIconComponents(iconPath, iconName) {
  const iconClassName = `${prefix}-${camelCaseToParamCase(iconName)}`;
  const componentName = `${camelCaseToPascalCase(
    paramCaseToCamelCase(iconClassName)
  )}`;
  let text = iconVue(iconName, componentName, iconClassName);
  const formattedContent = await prettierFormat(text);

  await fsPromises.writeFile(
    path.resolve(`${iconPath}`, `${componentName}.jsx`),
    formattedContent,
    fileOption
  );
}

main().then(_ => _);
