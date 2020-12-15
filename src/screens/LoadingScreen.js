import React, {Component, useState, useEffect, useContext} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';
import {UserContext} from '../context/userContext';
import {FirebaseContext} from '../context/firebaseContext';

const LoadingScreen = ({navigation}) => {
  const {state, setState} = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    setTimeout(async () => {
      const user = firebase.getCurrentUser();
      console.log('@setTimeout user: ', user);

      if (user) {
        const userInfo = await firebase.getUserInfo(user.uid);
        console.log('@loadingScreen userInfo: ', userInfo);

        setState({
          isLoggedIn: true,
          email: userInfo.email,
          uid: user.uid,
          username: userInfo.username,
          profilePhotoUrl: userInfo.profilePhotoUrl,
        });
      } else {
        setState((state) => ({...state, isLoggedIn: false}));
      }
    }, 500);
  }, []);

  return (
    <View style={styles.container}>
      <Text>Loading Screen</Text>
      <ActivityIndicator style={{padding: 20}} size="large" color="#4287f5" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingScreen;
