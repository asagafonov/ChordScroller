module.exports = {
  env: {
    test: {
      plugins: [
        '@babel/plugin-transform-runtime',
        '@babel/plugin-transform-async-to-generator',
      ],
    },
  },
};
