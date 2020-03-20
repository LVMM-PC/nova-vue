import path from 'path';
import json from '@rollup/plugin-json';
import alias from '@rollup/plugin-alias';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';

function fromTheRoot(p) {
  const projectRootDir = path.resolve(__dirname, '../..');
  return path.join(projectRootDir, p);
}

export default {
  input: 'src/index.js',
  plugins: [
    json(),
    alias({
      entries: [{ find: '@', replacement: fromTheRoot('src') }]
    }),
    vue({
      css: false
    }),
    babel({
      runtimeHelpers: true
    })
  ]
};
