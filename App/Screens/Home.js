import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Tittle from '../Components/Tittle'
import HomeImg from '../../asset/images/Home.png'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigator =useNavigation()
  return (
    <View style={{height:'100%',paddingBottom:30,paddingHorizontal:20}}>
        <Tittle/>
        <View style={styles.bannerContainer}>
            <Image source={HomeImg} style={styles.banner} resizeMode='contain'/>
        </View>
        <TouchableOpacity onPress={()=>navigator.navigate('quiz')}><Text style={styles.startBtn} >Start</Text></TouchableOpacity>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  banner:{
    width:'auto',
    height:500
  },
  bannerContainer:{
    justifyContent:'center',
    flex:1,
  },
  startBtn:{
    textAlign:'center',
    backgroundColor:'green',
    padding:15,
    color:'white',
    borderRadius:10,
    marginHorizontal:20,
    fontSize:20,
    fontWeight:'600'
  }
})
