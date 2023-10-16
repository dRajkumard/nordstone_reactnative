import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  HomeStack,
  LogStack,
} from './src/common/navigation/stack/RootStackScreen';
import {useSelector, useDispatch} from 'react-redux';
import {getAsyncData} from './src/common/utils/Functions';
import {setLogin} from './src/redux/slices/sessionSlice';
import auth from '@react-native-firebase/auth'
export default function AppRoot() {
  const isLoggedIn = useSelector(state => state.session.isLoggedIn);
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // useEffect(() => {
  //   checkAlreadyLogged();
  // });

  // Handle user state changes
  function onAuthStateChange(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChange);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // if (!user) {
  //   navigation.navigate('Auth');
  // const checkAlreadyLogged = async () => {
  //   const user_id = await getAsyncData('user_id');
  //   if (user_id != null) {
  //     dispatch(setLogin(true));
  //   }
  // // };
  // }
  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <LogStack />}
    </NavigationContainer>
  );
}
