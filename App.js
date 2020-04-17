// Import dependencies
import React, { Component } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';

// Import components
import { MuseumListHome, MuseumListDetail } from './components/Museum/MuseumList';
import { MuseumStatisticsHome, MuseumStatisticsDetail } from './components/Museum/MuseumStatistics';
import { UserHome } from './components/User/User';


// Disable warning
console.disableYellowBox = true;


// StackNavigator (Home->Detail) of MuseumList and MuseumStatistics Screen

const Stack = createStackNavigator();

function MuseumListStackScreen( {navigation,route} ){
  
  return (
    <Stack.Navigator
      headerMode='none'
    >
      <Stack.Screen name="MuseumListHome" component={ MuseumListHome } navigation={navigation} route={route} />
      <Stack.Screen name="MuseumListDetail" component={ MuseumListDetail} navigation={navigation} route={route} />
    </Stack.Navigator>
  );
}

function MuseumStatisticsStackScreen({navigation,route}){
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='MuseumStatisticsDetail'
    >
      <Stack.Screen name="MuseumStatisticsHome" component={ MuseumStatisticsHome } navigation={navigation} route={route} />
      <Stack.Screen name="MuseumStatisticsDetail" component={ MuseumStatisticsDetail } navigation={navigation} route={route} />
    </Stack.Navigator>
  );
}


// TopTabNavigator of MuseumList and MuseumStatistics Screen

const MuseumTopTab = createMaterialTopTabNavigator();

function MuseumTopNavigator() {
  return (
    <MuseumTopTab.Navigator>
      <MuseumTopTab.Screen name="List" component={ MuseumListStackScreen } />
      <MuseumTopTab.Screen name="Statistics" component={ MuseumStatisticsStackScreen } />
    </MuseumTopTab.Navigator>
  );
}


// BottomTabNavigator of Museum and User Screen
// Initial Home Screen

const BottomTab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon:({ focused, color, size })=>{
            let iconName;
            if(route.name==='Museum')iconName='home'
            else if(route.name==='User')iconName='person'
            return <Icon
              name={iconName}
              type='octicon'
              size={size}
              color={color}
              containerStyle={{marginTop:8}}
            />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'dodgerblue',
          inactiveTintColor: 'gray',
        }}
      >
        <BottomTab.Screen name="Museum" component={ MuseumTopNavigator } />
        <BottomTab.Screen name="User" component={ UserHome } />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
