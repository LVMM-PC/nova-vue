import { dest, series, src } from 'gulp';
import { fromTheRoot } from './utils';
import rename from 'gulp-rename';
import through2 from 'through2';
import parseXml from '@rgrove/parse-xml';
import del from 'del';
import prettier from 'prettier';

function iconCleanUp() {
  return del(['icons/json']);
}

function iconSvgToJson() {
  return src(fromTheRoot('icons/svg/**/*.svg'))
    .pipe(
      through2.obj((chunk, enc, cb) => {
        if (chunk.isBuffer()) {
          const before = chunk.contents.toString(enc);
          const xmlTree = parseXml(before);
          const content = JSON.stringify(xmlTree);
          const formattedContent = prettier.format(content, { parser: 'json' });
          chunk.contents = Buffer.from(formattedContent);
          cb(null, chunk);
        } else {
          cb(null, chunk);
        }
      })
    )
    .pipe(
      rename(p => {
        return {
          dirname: '/',
          basename: p.basename,
          extname: '.json'
        };
      })
    )
    .pipe(dest(fromTheRoot('icons/json')));
}

export default series(iconCleanUp, iconSvgToJson);
