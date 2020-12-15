import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {UserProvider} from './src/context/userContext';
import MainStack from './src/component/mainStack';

import {FirebaseProvider} from './src/context/firebaseContext';

const App = () => {
  return (
    <FirebaseProvider>
      <UserProvider>
        <NavigationContainer>
          <MainStack />
        </NavigationContainer>
      </UserProvider>
    </FirebaseProvider>
  );
};

export default App;
