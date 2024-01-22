import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Tittle = () => {
  return (
    <View>
      <Text style={styles.title}>Quiz</Text>
    </View>
  )
}

export default Tittle

const styles = StyleSheet.create({
  title:{
    fontSize:50,
    fontWeight:'600',
    color:'black',
    paddingTop:40,
    textAlign:'center'
  }
})
