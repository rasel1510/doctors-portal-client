const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Suppress source-map-loader warnings for node_modules
      const sourceMapRule = webpackConfig.module.rules.find(
        (rule) => rule.enforce === 'pre' && rule.use && rule.use.some && rule.use.some((u) => u.loader && u.loader.includes('source-map-loader'))
      );
      if (sourceMapRule) {
        sourceMapRule.exclude = [/node_modules/];
      }
      return webpackConfig;
    },
  },
};
