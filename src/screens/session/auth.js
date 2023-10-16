import { Alert } from 'react-native'; // Import Alert from react-native
import auth from '@react-native-firebase/auth';

export const signUp = (fullname, email, password) => {
  if (!fullname || !email || !password) {
    Alert.alert('Enter data'); // Use Alert.alert for displaying an alert
  } else {
    console.log("auth",email,password,fullname)
    return auth() 
      .createUserWithEmailAndPassword(email.trim(), password)
      .then(cred => {
        const { uid } = cred.user;
        auth().currentUser.updateProfile({
          displayName: fullname,
        });
        return uid;
      })
      .catch(err => {
        Alert.alert(err.code, err.message); // Use Alert.alert for displaying error messages
      });
  }
};

export const signIn = (email, password,navigation) => { // Added 'navigation' as a parameter
  if (!email || !password) {
    Alert.alert('Enter email and password');
  } else {
    return auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then(() => {
        navigation.navigate("Home");
      })
      .catch(err => {
        Alert.alert(err.code, err.message);
      });
  }
};

export const signOutapp = () => {
  return auth()
    .signOut()
    .then(() => console.log('User signed out!'))
    .catch(err => {
      Alert.alert(err.code, err.message);
    });
};



