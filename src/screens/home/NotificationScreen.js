import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  let fcmtoken =await AsyncStorage.getItem("fcmtoken");
  console.log("old token",fcmtoken);
  if(!fcmtoken){
    try {

      const fcmToken = await messaging().getToken();
      if (fcmToken) {
       
        console.log('newfcm token:', fcmToken);
        await AsyncStorage.setItem("fcmtoken",fcmtoken);
        
      } 
    } catch (error) {
      console.error('Error (getting FCM token:', error);
    }
  }

};
useEffect(()=>{
  requestUserPermission();
  getFcmToken();
  NotificatinListiner();
},[])
const sendFCMMessage = async () => {
  let fcmtoken =await AsyncStorage.getItem("fcmtoken");
  try {
    const fcmToken =  fcmtoken// Replace with the recipient's FCM token

    // Construct the request headers and body
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer AIzaSyCCMfAMHCt2thktzRpL5JNnQFSMZGkC2fU', // Replace with your access token
    };

    const body = JSON.stringify({
      message: {
        token: fcmToken,
        data: {},
        notification: {
          body: 'This is an FCM notification message!',
          title: 'FCM Message',
        },
      },
    });

    // Send the HTTP POST request to the FCM API
    const response = await fetch('https://fcm.googleapis.com/v1/Nordstone/nordstone-a852b/messages:send', {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (response.ok) {
      console.log('FCM message sent successfully');
    } else {
      console.error('Failed to send FCM message');
    }
  } catch (error) {
    console.error('Error sending FCM message:', error);
  }
};

const NotificatinListiner=()=>{
  //  Handle notifications when the app is in the background
    messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('Notification caused app to open from background state:', remoteMessage.notification);
    // Handle the notification as needed (e.g., navigate to a specific screen).
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check for an initial notification when the app is opened from a terminated state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('Notification caused app to open from quit state:', remoteMessage.notification);
        // Handle the notification as needed (e.g., navigate to a specific screen).
        // setInitialRoute(remoteMessage.data.type); // e.g., "Settings"
      }
    });
}
//   
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
    <Text style={{ marginBottom: 20 }}>Notification Screen</Text>
    <Button title="Send FCM Notification" onPress={sendFCMMessage} color="red" />
  </View>
  );
}

export default NotificationScreen;
