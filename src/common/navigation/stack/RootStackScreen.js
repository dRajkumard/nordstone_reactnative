import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  HOME_SCREEN,
  LOGIN_SCREEN,
  QR_SCANNER,
  SIGNUP_SCREEN,
} from '../../utils/NavigationRoot';
import LoginScreen from '../../../screens/session/LoginScreen';
import HomeScreen from '../../../screens/home/HomeScreen';
import DefaultHeader from '../../components/DefaultHeader';
import SignUpScreen from '../../../screens/session/SignUpScreen';

const Stack = createNativeStackNavigator();

export const LogStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={LOGIN_SCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SIGNUP_SCREEN}
        component={SignUpScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME_SCREEN}
        component={HomeScreen}
        options={({navigation}) => ({
          // title: null,
          // 
          header: () => (
            <DefaultHeader title="Home"/>
          ),
        })}
      />
     
    </Stack.Navigator>
  );
};
