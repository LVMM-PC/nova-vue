import path from 'path';
import { dest, series, src } from 'gulp';
import less from 'gulp-less';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import LessAutoprefix from 'less-plugin-autoprefix';

const autoprefix = new LessAutoprefix();

const lessOptions = {
  paths: [path.join(__dirname, 'less', 'includes')],
  plugins: [autoprefix]
};

function styleMoveImages() {
  return src('../src/assets/**/**.**').pipe(dest('../dist/img/'));
}

function styleBuildModule() {
  return src('../src/components/**/index.less')
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
    .pipe(dest('../dist/css'));
}

function StyleBuildAll() {
  return src('../src/styles/index.less')
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
    .pipe(dest('../dist/'));
}

export default series(styleMoveImages, styleBuildModule, StyleBuildAll);
