import type { ExpoConfig } from 'expo/config';
import { version } from './package.json';

const APP_NAME = 'Focus Bear Game';
const APP_ID = 'focus-bear-game';
const APP_PACKAGE = 'com.focusbear.game';

const imagePickerOptions = {
  photosPermission: `Allow ${APP_NAME} to accesses your photos`,
  cameraPermission: `Allow ${APP_NAME} to accesses your camera`,
};

const config: ExpoConfig = {
  name: APP_NAME,
  scheme: APP_ID,
  slug: APP_ID,
  version: version,
  icon: './assets/images/logo.png',
  userInterfaceStyle: 'automatic',
  backgroundColor: '#e7f3ff',
  splash: {
    image: './assets/images/logo.png',
    resizeMode: 'contain',
    backgroundColor: '#e7f3ff',
  },
  ios: {
    bundleIdentifier: APP_PACKAGE,
    icon: './assets/images/logo.png',
    supportsTablet: true,
  },
  android: {
    package: APP_PACKAGE,
    icon: './assets/images/logo.png',
    adaptiveIcon: {
      foregroundImage: './assets/images/logo.png',
      backgroundColor: '#e7f3ff',
    },
  },
  plugins: [
    'expo-router',
    ['expo-font', { fonts: ['./assets/fonts/inter.ttf'] }],
    ['expo-asset', { assets: ['assets'] }],
    ['expo-image-picker', imagePickerOptions],
  ],
  experiments: {
    typedRoutes: true,
    reactCanary: true,
  },
};

export default config;
