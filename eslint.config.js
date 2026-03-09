import antfu from '@antfu/eslint-config';

export default antfu({
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: ['template', 'script', 'style'],
      }],
    },
  },
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: true,
  },
  formatters: {
    css: true,
    html: true,
    scss: true,
  },
  overrides: {
    jsonc: true,
    yaml: true,
    markdown: true,
  },
  rules: {
    'no-console': 'off',
    'style/brace-style': 'off',
  },
});
