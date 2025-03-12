import messaging from '@react-native-firebase/messaging';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

// Request Android 13+ notification permission
export const requestAndroidNotificationPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message: 'This app needs permission to send you notifications.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Deny',
          buttonPositive: 'Allow',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Android notification permission granted');
        return true;
      } else {
        console.log('Android notification permission denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }
  return true;
};

// Request FCM permission
export const requestUserPermission = async () => {
  const androidPermissionGranted = await requestAndroidNotificationPermission();
  if (!androidPermissionGranted) {
    console.log('Cannot proceed without Android notification permission');
    return false;
  }
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('FCM Authorization status:', authStatus);
    return true;
  } else {
    console.log('FCM permission denied');
    return false;
  }
};
export const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM token:', token);
    return token;
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
};

export const setupForegroundListener = () => {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    Alert.alert(JSON.stringify(remoteMessage))
  });
  return unsubscribe;
};