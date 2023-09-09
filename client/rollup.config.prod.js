import {nodeResolve} from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';

const sparkResourcesPath = '../spark-server/src/main/resources/view';

export default {
  input: 'src/index.js',
  output: {
    dir: sparkResourcesPath,
    entryFileNames: 'app-[hash].js',
  },
  plugins: [
    nodeResolve(),
    terser(),
    htmlTemplate({
      template: 'index.html',
      target: `${sparkResourcesPath}/index.html`,
    }),
    copy({
      targets: [
        {src: 'styles', dest: sparkResourcesPath},
        {src: 'images', dest: sparkResourcesPath},
        {src: 'fonts', dest: sparkResourcesPath},
      ],
    }),
  ],
};
