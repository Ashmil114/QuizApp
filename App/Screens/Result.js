import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ResultImg from '../../asset/images/Winners.png'
import FailImg from '../../asset/images/fail.png'
import { useNavigation, useRoute } from '@react-navigation/native'


const Result = () => {

  const navigator = useNavigation()
  const { res } = useRoute().params
  // console.log(res);
  return (
    <View style={{height:'100%',paddingBottom:30,padding:30}}>
      <Text style={{fontSize:50,fontWeight:'600',color:'black',textAlign:'center'}}>Result</Text>
      <View style={{flex:1}}>
        {res >=4 ?
        <View style={styles.bannerContainer}>
          <Image source={ResultImg} style={styles.banner} resizeMode='contain'/>
        </View>:
        <View style={styles.bannerContainer}>
          <Image source={FailImg} style={styles.banner} resizeMode='contain'/>
        </View>
        }
        <Text style={{fontSize:70,fontWeight:'600',color:'black',textAlign:'center'}}>{res}/10</Text>
        {res <5 ?
        <Text style={{fontSize:13,fontWeight:'600',color:'black',textAlign:'center'}}>Below Average</Text>:
        res ==5 ?
        <Text style={{fontSize:13,fontWeight:'600',color:'black',textAlign:'center'}}>Average</Text>:
        res<9?<Text style={{fontSize:13,fontWeight:'600',color:'black',textAlign:'center'}}>Above Average</Text>:
        <Text style={{fontSize:13,fontWeight:'600',color:'black',textAlign:'center'}}>Excellent</Text>
        }
      </View>
      

      <TouchableOpacity onPress={()=> navigator.navigate('home')} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Text style={styles.exit}>Exit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
  banner:{
    width:'auto',
    height:300
  },
  bannerContainer:{
    justifyContent:'center',
    
  },
  exit:{
    backgroundColor:'red',
    width:100,
    textAlign:'center',
    color:'white',
    paddingVertical:10,
    borderRadius:10
  }
})