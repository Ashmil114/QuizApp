import 'react-native-gesture-handler';
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './App/NavigationsStack/HomeNavigator';



const App = () => {
  return (
    
        <NavigationContainer>
          <HomeNavigator/>
        </NavigationContainer>
      
    
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    paddingTop:30,
    paddingHorizontal:20,
    
  }
})
