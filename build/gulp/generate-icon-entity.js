import { dest, series, src } from 'gulp';
import cancat from 'gulp-concat';
import del from 'del';
import rename from 'gulp-rename';
import { fromTheRoot } from '../utils';
import cleanPaths from './plugins/clean-paths';
import iconDefinition from './plugins/icon-definition';
import svgo from './plugins/svgo';
import { singleColorSVGOConfig } from './config/svgo-option';
import getIndex from './plugins/get-index';
import prettierFormat from './plugins/prettier-format';

function iconEntityCleanUp() {
  return del(['icons/entities']);
}

function generateIconEntity() {
  return src(fromTheRoot('icons/svg/**/*.svg'))
    .pipe(cleanPaths())
    .pipe(svgo(singleColorSVGOConfig))
    .pipe(iconDefinition())
    .pipe(
      rename(p => {
        const baseName = p.basename;
        const fileName = `icon-${baseName}`;
        return {
          dirname: '/',
          basename: fileName,
          extname: '.json'
        };
      })
    )
    .pipe(dest(fromTheRoot('icons/entities')));
}

function generateIconIndex() {
  return src(fromTheRoot('icons/entities/**/*.json'))
    .pipe(getIndex())
    .pipe(cancat('index.js'))
    .pipe(prettierFormat({ parser: 'babel' }))
    .pipe(dest(fromTheRoot('icons/')));
}

export default series(iconEntityCleanUp, generateIconEntity, generateIconIndex);
