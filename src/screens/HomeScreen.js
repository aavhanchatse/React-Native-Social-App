//import liraries
import React, {Component, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

const WIDTH = Dimensions.get('window').width;

const HomeScreen = () => {
  const [email, setemail] = useState('');
  const [displayName, setdisplayName] = useState('');

  // const handlePress = async () => {
  //   await fetch('https://cricapi.com/api/matches/sNYlmRX8OKcL7X9NNL6Vooztta92')
  //     .then((data) => data.json())
  //     .then((data) => console.log(data.matches[0]['team-1']));
  // };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <View style={styles.feedContainer}>
        <Text style={{fontSize: 24, alignSelf: 'center', fontWeight: '300'}}>
          Feed
        </Text>
      </View>
      {/* <TouchableOpacity
        style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}
        onPress={handlePress}>
        <Text>API lik</Text>
      </TouchableOpacity> */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebecf3',
    paddingTop: 64,
  },
  feedContainer: {},
});

//make this component available to the app
export default HomeScreen;
