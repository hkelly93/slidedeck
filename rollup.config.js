import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import scss from 'rollup-plugin-scss'

export default {
  input: 'src/index.tsx',
  output: {
    file: pkg.module,
    format: 'es',
  },
  external: ['react', 'react-dom', 'typescript'],
  plugins: [
    typescript({
      typescript: require('typescript'), // eslint-disable-line
    }),
    scss()
  ],
};
