import * as esbuild from 'esbuild';

const commonOptions: esbuild.BuildOptions = {
  entryPoints: ['src/index.ts'],
  packages: 'external',
  bundle: true,
};

Promise.all([
  esbuild.build({
    ...commonOptions,
    outdir: 'dist',
    format: 'cjs',
  }),
  esbuild.build({
    ...commonOptions,
    outdir: 'cjs',
    format: 'cjs',
    outExtension: {
      '.js': '.cjs',
    },
  }),
  esbuild.build({
    ...commonOptions,
    outdir: 'esm',
    format: 'esm',
    outExtension: {
      '.js': '.mjs',
    },
  }),
  // eslint-disable-next-line no-console, @typescript-eslint/use-unknown-in-catch-callback-variable -- allow
]).catch(console.error);
