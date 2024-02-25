import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import { RollupOptions } from 'rollup';

const config: RollupOptions = {
  input: 'src/yald.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    preserveModules: true,
    exports: 'named',
    assetFileNames: '[name][extname]',
  },
  plugins: [
    resolve({ preferBuiltins: true }),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};

export default config;
