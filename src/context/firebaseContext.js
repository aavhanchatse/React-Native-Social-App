import React, {useState, useContext, createContext} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import moment from 'moment';

const FirebaseContext = createContext();

const db = firestore();

const Firebase = {
  getCurrentUser: () => {
    return auth().currentUser;
  },

  createUser: async (user) => {
    try {
      await auth().createUserWithEmailAndPassword(user.email, user.password);

      const uid = Firebase.getCurrentUser().uid;

      let profilePhotoUrl = 'default';

      await db.collection('users').doc(uid).set({
        username: user.username,
        email: user.email,
        profilePhotoUrl,
      });

      if (user.profilePhoto) {
        profilePhotoUrl = await Firebase.uploadProfilePhoto(user.profilePhoto);
      }

      delete user.password;

      return {...user, profilePhotoUrl, uid};
    } catch (error) {
      console.log('Error @createUser: ', error.message);
    }
  },

  uploadProfilePhoto: async (uri) => {
    const uid = Firebase.getCurrentUser().uid;

    try {
      const photo = await Firebase.getBlob(uri);

      const imageRef = storage().ref('profilePhotos').child(uid);

      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();

      await db.collection('users').doc(uid).update({
        profilePhotoUrl: url,
      });

      return url;
    } catch (error) {
      console.log('Error @uploadProfilePhoto: ', error);
    }
  },

  uploadPost: async (post) => {
    const uid = Firebase.getCurrentUser().uid;

    const date = moment(Date()).format('MMMM Do YYYY, h:mm:ss a');
    console.log('date: ', date);

    try {
      const photo = await Firebase.getBlob(post.photo);

      const imageRef = storage().ref(`posts/${uid}`).child(`${date}.jpeg`);

      await imageRef.put(photo);

      const url = await imageRef.getDownloadURL();

      await db.collection('users').doc(uid).collection('posts').doc(date).set({
        text: post.text,
        photoUrl: url,
      });
    } catch (error) {
      console.log('Error @uploadPost: ', error);
    }
  },

  getBlob: async (uri) => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError('Network request failed.'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  },

  getUserInfo: async (uid) => {
    try {
      let user = await db
        .collection('users')
        .doc(uid)
        .get()
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            console.log(
              '@Firebase.getUserInfo documentSnapshot: ',
              documentSnapshot.data(),
            );

            return documentSnapshot.data();
          }
        });

      console.log('@Firebase.getUserInfo user: ', user);
      return user;
    } catch (error) {
      console.log('Error @getUserInfo: ', error);
    }
  },

  logOut: async () => {
    try {
      auth().signOut();
      return true;
    } catch (error) {
      console.log('Error @logOut: ', error);
    }

    return false;
  },

  signIn: async (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  },
};

const FirebaseProvider = (props) => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export {FirebaseContext, FirebaseProvider};
