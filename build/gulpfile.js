const path = require('path');
const { series, src, dest } = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const LessAutoprefix = require('less-plugin-autoprefix');
const autoprefix = new LessAutoprefix();

const lessOptions = {
  paths: [path.join(__dirname, 'less', 'includes')],
  plugins: [autoprefix]
};

function moveImages() {
  return src('../src/assets/**/**.**').pipe(dest('../dist/img/'));
}

function buildModule() {
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

function build() {
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

exports.moveImages = moveImages;
exports.buildModule = buildModule;
exports.build = build;
exports.default = series(moveImages, buildModule, build);
