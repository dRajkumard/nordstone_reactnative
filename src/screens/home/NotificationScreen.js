import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import notifee from '@notifee/react-native';

function NotificationScreen() {
  // Function to send an FCM message
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Authorization status:', authStatus);
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  const getFcmToken = async () => {
    let fcmtoken = await AsyncStorage.getItem("fcmtoken");
    console.log("old token", fcmtoken);
    if (!fcmtoken) {
      try {
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          console.log('new FCM token:', fcmToken);
          await AsyncStorage.setItem("fcmtoken", fcmToken);
        }
      } catch (error) {
        console.error('Error (getting FCM token:', error);
      }
    }
  };

  useEffect(() => {
    requestUserPermission();
    getFcmToken();
    NotificatinListiner();
  }, []);

  const NotificatinListiner = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  };

  async function onDisplayNotification() {
    console.log("hello")
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'NordStone',
      body: 'Welcome to Nordstone',
      android: {
        channelId,
        // smallIcon: 'ic_notification', // optional, defaults to 'ic_launcher'.
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{ marginBottom: 20 }}>Notification Screen</Text>
      <Button onPress={() => onDisplayNotification()} title="Send FCM Notification" color="red" />
    </View>
  );
}

export default NotificationScreen;
