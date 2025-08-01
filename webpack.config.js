const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  
  // Customize the config before returning it.
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
  };

  // Add support for static file serving
  config.devServer = {
    ...config.devServer,
    historyApiFallback: true,
    static: {
      directory: require('path').join(__dirname, 'dist'),
    },
  };

  return config;
}; 