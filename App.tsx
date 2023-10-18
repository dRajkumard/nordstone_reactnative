import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store';
import AppRoot from './AppRoot';
import { ToastProvider } from 'react-native-toast-notifications'
import messaging from '@react-native-firebase/messaging';
import SplashScreen from 'react-native-splash-screen';
import { Alert, Platform } from 'react-native';
export default function App() {

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  useEffect(() => {
    if(Platform.OS ==='android')
    
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <ToastProvider>
        <AppRoot />
      </ToastProvider>
    </Provider>
  )
}