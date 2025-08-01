const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = async function(env, argv) {
  // Ensure mode is properly set with fallback
  const mode = (argv && argv.mode) || (env && env.mode) || 'development';
  const config = await createExpoWebpackConfigAsync({ ...env, mode }, argv);
  
  // Customize the config before returning it.
  config.resolve.alias = {
    ...config.resolve.alias,
    'react-native$': 'react-native-web',
    'react-native/Libraries/Components/View/ViewStylePropTypes': 'react-native-web/dist/exports/View/ViewStylePropTypes',
    'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter': 'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
    'react-native/Libraries/vendor/emitter/EventEmitter': 'react-native-web/dist/vendor/react-native/emitter/EventEmitter',
    'react-native/Libraries/vendor/emitter/EventSubscriptionVendor': 'react-native-web/dist/vendor/react-native/emitter/EventSubscriptionVendor',
    'react-native/Libraries/EventEmitter/RCTDeviceEventEmitter': 'react-native-web/dist/vendor/react-native/NativeEventEmitter/RCTDeviceEventEmitter',
    // Add fallback for expo-router
    'expo-router': false,
  };

  // Add fallbacks for missing modules
  config.resolve.fallback = {
    ...config.resolve.fallback,
    'react-native-web/dist/exports/PixelRatio': require.resolve('react-native-web/dist/exports/PixelRatio'),
    'react-native-web/dist/exports/NativeModules': require.resolve('react-native-web/dist/exports/NativeModules'),
    'react-native-web/dist/exports/processColor': require.resolve('react-native-web/dist/exports/processColor'),
    'react-native-web/dist/exports/NativeEventEmitter': require.resolve('react-native-web/dist/exports/NativeEventEmitter'),
    'react-native-web/dist/exports/Platform': require.resolve('react-native-web/dist/exports/Platform'),
    // Add fallbacks for expo-router and other missing modules
    'expo-router': false,
    'expo-router/entry': false,
    'expo-router/_ctx': false,
    'expo-router/_ctx.web': false,
  };

  // Add HTML webpack plugin for web
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html',
    })
  );

  return {
    ...config,
    mode,
    entry: path.resolve(__dirname, 'index.tsx'),
    output: {
      ...config.output,
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
      clean: true,
    },
  };
}; 