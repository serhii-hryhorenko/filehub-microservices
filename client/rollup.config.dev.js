import {nodeResolve} from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import htmlTemplate from 'rollup-plugin-generate-html-template';
import copy from 'rollup-plugin-copy';
import dev from 'rollup-plugin-dev';
import livereload from 'rollup-plugin-livereload';

const buildPath = 'build';

export default {
  input: 'src/index.js',
  output: {
    dir: buildPath,
    entryFileNames: 'app-[hash].js',
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    htmlTemplate({
      template: 'index.html',
      target: `${buildPath}/index.html`,
    }),
    copy({
      targets: [
        {src: 'styles', dest: 'build'},
        {src: 'images', dest: 'build'},
        {src: 'fonts', dest: 'build'},
      ],
    }),
    dev({
      port: 3000,
      dirs: ['build'],
      proxy: [{from: '/api', to: 'http://localhost:3001'}],
    }),
    livereload(),
  ],
};
