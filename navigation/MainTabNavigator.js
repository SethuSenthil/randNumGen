import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements'

import RandNumScreen from '../screens/RandNumScreen';
import RandNumFullScreen from '../screens/RandNumFullScreen';
import ListScreen from '../screens/ListScreen';
import EditListScreen from '../screens/EditListScreen';
import CameraScreen from '../screens/CameraScreen';
import SettingScreen from '../screens/SettingScreen';

const HomeStack = createStackNavigator({
  Home: RandNumScreen,
  FullScreen: RandNumFullScreen,
});

RandNumScreen.navigationOptions = {
  title: 'Random Number',
}

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Random Number',
    tabBarIcon: ({ focused }) => (
      <Icon
        name='dice-multiple'
        size={26}
        type='material-community'
        style={{ marginBottom: -3 }}
        color={focused ? "red" : "black"}
      />
    ),
  };
};


const ListStack = createStackNavigator({
  List: ListScreen,
  EditList: EditListScreen,
  Camera: CameraScreen
});

//Navigation options are defined in the ListScreen Class
/*ListScreen.navigationOptions = {
  title: 'Lists',
}*/

ListStack.navigationOptions = {
  tabBarLabel: 'Lists',
  tabBarIcon: ({ focused }) => (
    <Ionicons   
      size={26}
      style={{ marginBottom: -3 }}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
      color={focused ? "red" : "black"}
    />
  ),
};

const SettingStack = createStackNavigator({
  Setting: SettingScreen,
});

SettingScreen.navigationOptions = {
  title: 'Settings',
}

SettingStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <Ionicons
      size={26}
      style={{ marginBottom: -3 }}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
      color={focused ? "red" : "black"}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  ListStack,
  SettingStack,
});
