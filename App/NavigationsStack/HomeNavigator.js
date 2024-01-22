import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../Screens/Home';
import Quiz from '../Screens/Quiz';
import Result from '../Screens/Result';

const StackNav = createStackNavigator();

const HomeNavigator = () => {
  return (
    <StackNav.Navigator screenOptions={{
      headerShown:false
    }}>
        <StackNav.Screen name='home' component={Home} />
        <StackNav.Screen name='quiz' component={Quiz} />
        <StackNav.Screen name='result' component={Result} />


    </StackNav.Navigator>
  )
}

export default HomeNavigator;