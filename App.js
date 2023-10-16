import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { store } from './src/redux/store';
import AppRoot from './AppRoot';
import { ToastProvider } from 'react-native-toast-notifications'
import SplashScreen from 'react-native-splash-screen';
export default function App() {
  useEffect(() => {
    // Hide the splash screen when your app is ready
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