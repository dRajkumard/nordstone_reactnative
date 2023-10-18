import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import NotificationScreen from './NotificationScreen';
import PhotoScreen from './PhotoScreen';
import TextScreen from './TextScreen';
import CalculatorScreen from './CalculatorScreen';
import File from './file';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator>
        <Tab.Screen
          name="Notification"
          component={NotificationScreen}
          options={{
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color, size }) => (
              <Icon name="notifications" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Photo"
          component={PhotoScreen}
          options={{
            tabBarLabel: 'Photo',
            tabBarIcon: ({ color, size }) => (
              <Icon name="image" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Text"
          component={TextScreen}
          options={{
            tabBarLabel: 'Text',
            tabBarIcon: ({ color, size }) => (
              <Icon name="text" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Calculator"
          component={CalculatorScreen}
          options={{
            tabBarLabel: 'Calculator',
            tabBarIcon: ({ color, size }) => (
              <Icon name="calculator" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
