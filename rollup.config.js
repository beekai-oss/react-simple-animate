import typescript from 'rollup-plugin-typescript2';
import { babel } from '@rollup/plugin-babel';

export default {
  input: 'src/index.ts',
  plugins: [
    typescript(),
    babel({
      babelHelpers: 'bundled',
      extensions: ['.ts', '.tsx']
    })
  ],
  external: ['react'],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.es.js',
      format: 'es',
    },
  ],
};
