import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// For web rendering
if (typeof document !== 'undefined') {
  const container = document.getElementById('root');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(App));
  }
}

// For mobile compatibility
import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';

registerRootComponent(App);
AppRegistry.registerComponent('main', () => App); 