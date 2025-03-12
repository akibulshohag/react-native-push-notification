/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { requestUserPermission, getToken,setupForegroundListener } from './src/notifications'; // Import from notifications.js

function App() {
  useEffect(() => {
    // Call the permission and token functions
    const initializeNotifications = async () => {
      const permissionGranted = await requestUserPermission();
      if (permissionGranted) {
        const token = await getToken();
        if (token) {
          console.log('Token to send to server:', token);
        }
      }
    };

    initializeNotifications();
    const unsubscribe = setupForegroundListener();
    return () => unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View>
        <Text>Hello App</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;