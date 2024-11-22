module.exports = {
    plugins: ['testing-library'],
    extends: [
      'plugin:testing-library/react'
    ],
    rules: {
      'testing-library/no-node-access': 'error',
      'testing-library/prefer-screen-queries': 'error',
      'testing-library/render-result-naming-convention': 'error',
      'testing-library/no-debugging-utils': 'warn'
    }
  };
