import { dest, series, src } from 'gulp';
import del from 'del';
import rename from 'gulp-rename';
import { fromTheRoot } from './utils';
import cleanPaths from './plugins/clean-paths';
import iconDefinition from './plugins/icon-definition';
import svgo from './plugins/svgo';
import { singleColorSVGOConfig } from './config/svgo-option';

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
        return {
          dirname: '/',
          basename: p.basename,
          extname: '.json'
        };
      })
    )
    .pipe(dest(fromTheRoot('icons/entities')));
}

export default series(iconEntityCleanUp, generateIconEntity);
