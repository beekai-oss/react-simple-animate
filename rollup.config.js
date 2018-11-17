import flow from 'rollup-plugin-flow';
import babel from 'rollup-plugin-babel';

const plugins = [
  flow({
    // needed for sourcemaps to be properly generated
    pretty: true
  }),
  babel({
    exclude: 'node_modules/**',
  }),
];

export default {
  input: 'src/index.js',
  plugins,
  external: [ 'react' ],
  output: {
    file: 'lib/index.js',
    format: 'cjs'
  }
};
