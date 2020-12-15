import React, {Component, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Icon} from 'native-base';

import {FirebaseContext} from '../context/firebaseContext';
import {UserContext} from '../context/userContext';

// create a component
const ProfileScreen = () => {
  const firebase = useContext(FirebaseContext);
  const {state, setState} = useContext(UserContext);

  const logOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setState((state) => ({...state, isLoggedIn: false}));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        {state.profilePhotoUrl === 'default' ? (
          <Icon type="Ionicons" name="person" />
        ) : (
          <Image style={styles.image} source={{uri: state.profilePhotoUrl}} />
        )}
      </View>

      <Text style={styles.username}>{state.username}</Text>

      <View style={styles.statsContainer}>
        <View style={styles.stats}>
          <Text style={{fontSize: 30, fontWeight: '300'}}>21</Text>
          <Text style={{color: '#c2c4cd'}}>Posts</Text>
        </View>
        <View style={styles.stats}>
          <Text style={{fontSize: 30, fontWeight: '300'}}>21</Text>
          <Text style={{color: '#c2c4cd'}}>Posts</Text>
        </View>
        <View style={styles.stats}>
          <Text style={{fontSize: 30, fontWeight: '300'}}>21</Text>
          <Text style={{color: '#c2c4cd'}}>Posts</Text>
        </View>
      </View>

      <TouchableOpacity onPress={logOut} style={styles.logOut}>
        <Text style={{fontWeight: 'bold', color: '#E9446A', fontSize: 16}}>
          Log Out
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 64,
  },
  avatar: {
    width: 128,
    height: 128,
    borderRadius: 80,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    // shadowColor: '#222222',
    elevation: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
    // alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: '#e6e3e3',
  },
  image: {
    height: 128,
    width: 128,
    borderRadius: 80,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    // elevation: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 8,
    marginBottom: 32,
  },
  stats: {
    flex: 1,
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 32,
    flex: 1,
  },
  logOut: {
    marginBottom: 32,
  },
});

//make this component available to the app
export default ProfileScreen;
