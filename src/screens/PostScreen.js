import React, {Component, useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {Icon} from 'native-base';
import {FirebaseContext} from '../context/firebaseContext';
import {PERMISSIONS, check, request, RESULTS} from 'react-native-permissions';
import ImagePicker from 'react-native-image-crop-picker';
import {UserContext} from '../context/userContext';

// create a component
const PostScreen = ({navigation}) => {
  const [photo, setphoto] = useState();
  const [text, settext] = useState('');

  const firebase = useContext(FirebaseContext);
  const {state, setState} = useContext(UserContext);

  const uploadPost = async () => {
    const post = {text, photo};
    try {
      await firebase.uploadPost(post).then(settext(''), setphoto());
    } catch (error) {
      console.log('Error @uploadPost: ', error);
    } finally {
      navigation.goBack();
    }
  };

  const pickImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then((image) => {
      console.log(image);

      setphoto(image.path);
      console.log(photo);
    });
  };

  const uploadPhoto = async () => {
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
    // <SafeAreaView>
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent={false}
        backgroundColor="transparent"
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={{paddingHorizontal: 16}}
          onPress={() => navigation.goBack()}>
          <Icon
            type="Ionicons"
            name="arrow-back"
            style={{fontSize: 24, color: '#d8d9db'}}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{paddingHorizontal: 16}} onPress={uploadPost}>
          <Text style={{fontWeight: '500'}}>Post</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.input}>
        <Image
          source={{
            uri: state.profilePhotoUrl,
          }}
          style={styles.avatar}
        />
        <TextInput
          placeholder="What's on your mind?"
          autoFocus={true}
          multiline={true}
          numberOfLines={4}
          style={{flex: 1}}
          value={text}
          onChangeText={(val) => settext(val)}
        />
      </View>

      <TouchableOpacity style={styles.photo} onPress={uploadPhoto}>
        <Icon
          type="Ionicons"
          name="camera"
          style={{fontSize: 32, color: '#d8d9db'}}
        />
      </TouchableOpacity>

      <Image source={{uri: photo}} style={{height: 300, width: '100%'}} />
    </View>
    // </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    justifyContent: 'space-between',
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomColor: '#d8d9db',
    borderBottomWidth: 1,
    height: 60,
    paddingHorizontal: 16,
    elevation: 5,
  },
  input: {
    marginHorizontal: 32,
    flexDirection: 'row',
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32,
  },
});

export default PostScreen;
