//import liraries
import React, {Component, useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

import {FirebaseContext} from '../context/firebaseContext';
import {UserContext} from '../context/userContext';

const WIDTH = Dimensions.get('window').width;

const LoginScreen = ({navigation}) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [errormsg, seterrormsg] = useState(null);
  const [loading, setLoading] = useState(false);

  const firebase = useContext(FirebaseContext);
  const {state, setState} = useContext(UserContext);

  const signIn = async () => {
    if (email.length === 0 || password.length === 0) {
      seterrormsg('Email and Password cannot be empty.');
    } else {
      setLoading(true);

      try {
        await firebase.signIn(email, password);

        const uid = firebase.getCurrentUser().uid;

        const userInfo = await firebase.getUserInfo(uid);

        setState({
          username: userInfo.username,
          email: userInfo.email,
          uid,
          profilePhotoUrl: userInfo.profilePhotoUrl,
          isLoggedIn: true,
        });
      } catch (error) {
        console.log('Error @signIn: ', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <Text style={styles.greeting}>{`Welcome ! \nLogin`}</Text>
        <View style={styles.error}>{errormsg && <Text>{errormsg}</Text>}</View>
      </View>

      <View style={styles.form}>
        <View style={{marginTop: 50}}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            value={email}
            onChangeText={(val) => setemail(val)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            autoCapitalize="none"
            value={password}
            onChangeText={(val) => setpassword(val)}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => signIn()}>
            {loading ? (
              <ActivityIndicator
                style={{padding: 20}}
                size="large"
                color="#4287f5"
              />
            ) : (
              <Text style={{textAlign: 'center'}}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginTop: 30}}
            onPress={() => navigation.navigate('Register')}>
            <Text style={{textAlign: 'center'}}>Register ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    // backgroundColor: 'red'
  },
  greeting: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '400',
    marginTop: 90,
  },
  error: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 30,
  },
  form: {
    flex: 2,
  },
  input: {
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: 'pink',
    width: WIDTH - 60,
    height: 60,
    justifyContent: 'center',
    borderRadius: 50,
  },
});

export default LoginScreen;
