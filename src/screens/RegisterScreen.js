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
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Icon} from 'native-base';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import {FirebaseContext} from '../context/firebaseContext';
import {UserContext} from '../context/userContext';

const WIDTH = Dimensions.get('window').width;

const RegisterScreen = ({navigation}) => {
  const [username, setusername] = useState('');
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [errormsg, seterrormsg] = useState(null);
  const [loading, setloading] = useState(false);
  const [profilePhoto, setprofilePhoto] = useState();

  const {state, setState} = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const handleSignUp = async () => {
    if (email.length === 0 || password.length === 0 || username.length === 0) {
      seterrormsg('Fields cannot be blank.');
    } else {
      setloading(true);

      const user = {username, email, password, profilePhoto};

      try {
        const createdUser = await firebase.createUser(user);
        setState({...createdUser});
      } catch (error) {
        console.log('Error @handleSignUp: ', error);
      } finally {
        setloading(false);
      }
    }
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      console.log(image);

      setprofilePhoto(image.path);
      console.log(profilePhoto);
    });
  };

  const addProfilePic = async () => {
    const status = await request(PERMISSIONS.ANDROID.CAMERA);
    console.log(status);

    if (status !== RESULTS.GRANTED) {
      Alert.alert(
        'Camera Permission Denied',
        'SocialApp needs permission to access your Camera.',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

    pickImage();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <Text style={styles.greeting}>Register</Text>

        <TouchableOpacity style={styles.avatar} onPress={addProfilePic}>
          {profilePhoto ? (
            <Image
              source={{
                uri: profilePhoto,
              }}
              style={{flex: 1, height: 50, width: 50}}
            />
          ) : (
            <Icon type="Ionicons" name="add" />
          )}
        </TouchableOpacity>

        <View style={styles.error}>{errormsg && <Text>{errormsg}</Text>}</View>
      </View>

      <View style={styles.form}>
        <View style={{marginTop: 20}}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={username}
            onChangeText={(val) => setusername(val)}
          />
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
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSignUp()}>
            {loading ? (
              <ActivityIndicator
                style={{padding: 20}}
                size="large"
                color="#4287f5"
              />
            ) : (
              <Text style={{textAlign: 'center'}}>Register</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginTop: 30}}
            onPress={() => navigation.goBack()}>
            <Text style={{textAlign: 'center'}}>Login ?</Text>
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
  avatar: {
    width: 68,
    height: 68,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: '#e6e3e3',
  },
});

export default RegisterScreen;
