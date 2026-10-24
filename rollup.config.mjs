import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.ts',
  plugins: [typescript({ tsconfig: './tsconfig.build.json' })],
  external: ['react'],
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.mjs',
      format: 'es',
      sourcemap: true,
    },
  ],
};
