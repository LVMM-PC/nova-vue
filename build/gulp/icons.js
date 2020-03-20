import del from 'del';
import iconDefinition from './plugins/icon-definition';
import rename from 'gulp-rename';
import svgo from './plugins/svgo';
import { dest, series, src } from 'gulp';
import { fromTheRoot } from './utils';
import { singleColorSVGOConfig } from './config/svgo-option';

function iconCleanUp() {
  return del(['icons/json']);
}

function iconSvgToJson() {
  return src(fromTheRoot('icons/svg/**/*.svg'))
    .pipe(svgo(singleColorSVGOConfig))
    .pipe(iconDefinition())
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
