import path from 'path';
import { dest, series, src } from 'gulp';
import less from 'gulp-less';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import LessAutoprefix from 'less-plugin-autoprefix';
import {fromTheRoot} from './utils';

const autoprefix = new LessAutoprefix();

const lessOptions = {
  paths: [path.join(__dirname, 'less', 'includes')],
  plugins: [autoprefix]
};

function styleMoveImages() {
  return src(fromTheRoot('src/assets/**/**.**')).pipe(
    dest(fromTheRoot('dist/img/'))
  );
}

function styleBuildModule() {
  return src(fromTheRoot('src/components/**/index.less'))
    .pipe(less(lessOptions))
    .pipe(replace('url(../../../assets/', 'url(../img/'))
    .pipe(
      rename(p => {
        return {
          dirname: '/',
          basename: p.dirname.split('\\')[0],
          extname: p.extname
        };
      })
    )
    .pipe(dest(fromTheRoot('dist/css')));
}

function StyleBuildAll() {
  return src(fromTheRoot('src/styles/index.less'))
    .pipe(less(lessOptions))
    .pipe(replace('url(../../../assets/', 'url(./img/'))
    .pipe(
      rename(p => {
        return {
          dirname: '/',
          basename: 'nova',
          extname: p.extname
        };
      })
    )
    .pipe(dest(fromTheRoot('dist/')));
}

export default series(styleMoveImages, styleBuildModule, StyleBuildAll);
