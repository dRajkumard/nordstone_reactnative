import messaging from '@react-native-firebase/messaging';
import {getAsyncData, setAsyncData} from '../../common/utils/Functions';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};
async function GetFCMToken() {
  let fcmtoken = await getAsyncData('fcmtoken');
  console.log("oldtoken",fcmtoken)
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log("newtoken",fcmtoken)
        await setAsyncData('fcmtoken', fcmtoken);
      } 
    } catch (error) {
      console.log('error', error);
    }
  }
}
export const NotificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
   
  });
  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });
  messaging().onMessage(async remoteMessage => {
    console.log('notification on froground state...', remoteMessage);
  });
};
