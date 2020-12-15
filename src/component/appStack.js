import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import MessageScreen from '../screens/MessageScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PostTemp from '../screens/PostTemp';

import Icon from 'react-native-vector-icons/Ionicons';

function AppStack() {
  const Tab = createBottomTabNavigator();

  const tabBarOptions = {
    showLabel: false,
  };

  const screenOptions = ({route}) => ({
    tabBarIcon: ({focused}) => {
      let iconName;

      switch (route.name) {
        case 'Home':
          iconName = 'home';
          break;

        case 'Message':
          iconName = 'chatbox';
          break;

        case 'Notification':
          iconName = 'notifications';
          break;

        case 'Profile':
          iconName = 'person';
          break;

        default:
          iconName = 'home';
      }

      if (route.name === 'Post') {
        return (
          <Icon
            name="add-circle"
            size={48}
            color={'#E9446A'}
            style={{
              shadowColor: '#E9446A',
              shadowOffset: {width: 0, height: 0},
              shadowRadius: 10,
              shadowOpacity: 0.3,
            }}
          />
        );
      }

      // You can return any component that you like here!
      return (
        <Icon
          name={iconName}
          size={24}
          color={focused ? '#161F3D' : '#B8BBC4'}
        />
      );
    },
  });

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions} screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen
        name="Post"
        component={PostTemp}
        listeners={({navigation}) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            navigation.navigate('PostScreen');
          },
        })}
      />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default AppStack;
