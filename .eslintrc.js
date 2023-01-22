module.exports = {
  settings: {
    "import/resolver": {
      "typescript": {}
    }
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
    tsconfigRootDir: "./",
  },
  plugins: [
    "@typescript-eslint",
    'simple-import-sort',
    'react',
    'react-hooks',
    '@typescript-eslint/eslint-plugin',
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', 'config-overrides.js'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^@nestjs'],
          ['^express'],
          ['^rxjs'],
          ['^\\w+', '^@\\w+'],
          ['^app/'],
          ['^\\.{1}'],
          ['^\\.{2}'],
          ['^'],
          ['^~\\w+'],
          ['^\\u0000'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      {
        blankLine: 'any',
        prev: ['const', 'let', 'var'],
        next: ['const', 'let', 'var'],
      },
    ],
    'array-bracket-spacing': ['error', 'always', { singleValue: false }],
    'object-curly-spacing': [
      2,
      'always',
      {
        objectsInObjects: false,
        arraysInObjects: false,
      },
    ],
    'object-curly-newline': ['error', { consistent: true }],
    'comma-spacing': ['error', { before: false, after: true }],
    'space-before-blocks': [
      'error',
      {
        functions: 'always',
        keywords: 'always',
        classes: 'always',
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: [
          'FunctionExpression > .params[decorators.length > 0]',
          'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
          'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key',
        ],
      },
    ],
    semi: ['error', 'always'],
    'generator-star-spacing': ['error', { before: true, after: false }],
    'keyword-spacing': [
      'error',
      {
        overrides: {
          import: { before: false },
          export: { before: false },
          public: { before: false },
          private: { before: false },
        },
      },
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': ['error', 'never'],
    'key-spacing': [
      'error',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    quotes: ['error', 'single', { avoidEscape: true }],
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/ban-ts-comment': [
      1,
      {
        'ts-ignore': false,
        'ts-nocheck': true,
        'ts-check': true,
      },
    ],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-empty-function': 0,
    "@typescript-eslint/space-infix-ops": 1,
    '@typescript-eslint/member-delimiter-style': [
      1,
      {
        multiline: {
          delimiter: 'semi',
          requireLast: true,
        },
        singleline: {
          delimiter: 'semi',
          requireLast: false,
        },
      },
    ],
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-extra-semi': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
        enums: 'always-multiline',
      },
    ],
    "react/jsx-wrap-multilines": [
      "error",
      {
        "declaration": "parens-new-line",
        "assignment": "parens-new-line",
        "return": "parens-new-line",
        "arrow": "parens-new-line",
        "condition": "parens-new-line",
        "logical": "parens-new-line",
        "prop": "parens-new-line"
      }
    ],
    "react/jsx-indent": ["error", 2, {checkAttributes: true}],
    "react/jsx-closing-bracket-location": 1,
    "react/jsx-closing-tag-location": 1
  },
};
