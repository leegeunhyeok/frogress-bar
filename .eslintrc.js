const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  extends: [
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      rules: {
        camelcase: 'off',
        eqeqeq: 'off',
        'no-useless-escape': 'off',
        'prefer-named-capture-group': 'off',
        'import/no-named-as-default-member': 'off',
        '@typescript-eslint/unified-signatures': 'off',
      },
    },
    {
      files: ['demo/**/*.js'],
      rules: {
        'no-console': 'off',
        '@typescript-eslint/no-floating-promises': 'off',
      },
    },
    {
      files: ['tsup.config.ts'],
      rules: {
        'import/no-default-export': 'off',
      },
    },
  ],
};
