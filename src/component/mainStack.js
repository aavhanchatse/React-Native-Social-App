import React, {Component, useContext, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoadingScreen from '../screens/LoadingScreen';
import PostScreen from '../screens/PostScreen';

import AuthStack from './authStack';
import AppStack from './appStack';

import auth from '@react-native-firebase/auth';
import {UserContext} from '../context/userContext';

const MainStack = () => {
  const Stack = createStackNavigator();
  const {state} = useContext(UserContext);

  return (
    <Stack.Navigator
      headerMode="none"
      mode="modal"
      screenOptions={{animationEnabled: false}}>
      {state.isLoggedIn === null ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : state.isLoggedIn ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}

      <Stack.Screen
        name="PostScreen"
        component={PostScreen}
        options={{animationEnabled: true}}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
