/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { getMessaging, onMessage, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { getApp } from '@react-native-firebase/app';

const firebaseApp = getApp();
const messaging = getMessaging(firebaseApp);

// Background message handler (Use setBackgroundMessageHandler instead of onBackgroundMessage)
setBackgroundMessageHandler( messaging, async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
