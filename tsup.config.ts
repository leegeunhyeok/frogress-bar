import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  dts: true,
  clean: true,
  format: ['cjs', 'esm'],
  tsconfig: 'tsconfig.build.json',
  platform: 'node',
  noExternal: [/.*/],
  esbuildOptions: (options, { format }) => {
    options.inject = [
      ...(options.inject ?? []),
      format === 'esm' ? './cjs-shim.mjs' : null,
    ].filter(Boolean) as string[];

    options.banner = {
      ...options.banner,
      js: [
        format === 'cjs' ? safetyExpr(JSON.stringify('use strict')) : null,
        /**
         * https://github.com/vadimdemedes/yoga-layout-prebuilt/issues/21
         */
        safetyExpr('var _a'),
        options.banner?.js,
      ]
        .filter(Boolean)
        .join('\n'),
    };
  },
});

function safetyExpr(expr: string): string {
  return `${expr};`;
}
