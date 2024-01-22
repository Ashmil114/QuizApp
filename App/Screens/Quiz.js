import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'

const Quiz = () => {

  const navigator = useNavigation()
  const [question,setQuestion] = useState()
  const [questionNo,setQuestionNo] = useState(0)
  const [end,setEnd]=useState(false)
  const [options,setOptions] = useState([])
  const [correct,setCorrect]=useState(0)
  const [timer,setTimer] = useState(10)
  const [lastSec,setLastSec]=useState(false)
  const [showTimer,setShowTimer] = useState(true)

  const shuffleArray=(array)=>{
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const getQuiz = async () =>{
    const url ='https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'
    const res = await fetch(url)
    const data = await res.json()
    // console.log(data.results[0])
    setQuestion(data.results)
    setOptions(generateShaffleOptions(data.results[0]))
    
  }

  useEffect(()=>{
    getQuiz()
  },[])


  useEffect(() => {
    const Timers = setInterval(() => {
      setTimer(timer => timer - 1);
    }, 1000);

    return () => clearInterval(Timers);
  }, []);

  useEffect(() => {
    if(timer <=5){
      setLastSec(true)
    }else{
      setLastSec(false)
    }
    if (timer === 0) {
      if (questionNo < 9){
        nextHandler()
      }
      else{
        // navigator.navigate('result',{res:correct})
        setShowTimer(false)
        setEnd(true)
      }
      
      setTimer(10)
    }
  }, [timer]);



  const generateShaffleOptions =(ques) =>{
    const option = [...ques.incorrect_answers]
    option.push(ques.correct_answer)
    shuffleArray(option)
    
    return option

  }

  const nextHandler=()=>{
    setQuestionNo(questionNo+1)
    setOptions(generateShaffleOptions(question[questionNo+1]))
    setTimer(10)
    
  }

  const selectedOptionHandler=(_selectedOption)=>{
    // console.log(_selectedOption === question[questionNo].correct_answer);

    if (_selectedOption === question[questionNo].correct_answer){
      setCorrect(correct+1)
    }
    if (questionNo < 9){
      nextHandler()
    }
    else{
      navigator.navigate('result',{res:correct})
      // setEnd(true)
    }
  }


  const showAlert = () => {
    Alert.alert(
      'Are you sure about that !',
      '!',
      [
        { text: 'No', onPress: () => {}},
        { text: 'Yes I want to quit', onPress: () => navigator.navigate('home')}
      ],
      { cancelable: true }
    );
  };
  
  

  return (
    
        <View style={{paddingHorizontal:20,height:'100%',paddingBottom:25,paddingTop:20}}>
          {question && 
          
          <View style={{height:'100%',width:'100%'}}>
            {showTimer?<View style={styles.timerContainer}><Text style={lastSec?styles.timerR:styles.timerG}>{timer}</Text></View>:null}
            <Text style={styles.ques}>Q{questionNo+1} . {question[questionNo].question}</Text>
            <View style={styles.options}>
              <TouchableOpacity onPress={()=>selectedOptionHandler(options[0])}>
                <Text style={styles.option}>{options[0]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>selectedOptionHandler(options[1])}>
                <Text style={styles.option}>{options[1]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>selectedOptionHandler(options[2])}>
                <Text style={styles.option}>{options[2]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>selectedOptionHandler(options[3])}>
                <Text style={styles.option}>{options[3]}</Text>
              </TouchableOpacity>
            </View>
            {/* <Text>Correct:{question[questionNo].correct_answer}</Text>
            <Text>CorrectScore:{correct}</Text> */}

            <View style={styles.bottonBtn}>
            {!end?
              <TouchableOpacity onPress={()=>{
                    questionNo < 9? 
                      nextHandler()

                    :
                    setEnd(true)
                    
                  }}>
                <View style={{backgroundColor:'blue',paddingVertical:10,paddingHorizontal:60,borderRadius:10}}>
                    <Text style={styles.BtnS}>SKIP</Text>
                </View>
              </TouchableOpacity>:null
              }
              {end?
                <TouchableOpacity onPress={()=>{navigator.navigate('result',{res:correct})}}>
                  <View style={{backgroundColor:'green',paddingVertical:10,paddingHorizontal:60,borderRadius:10}}>
                      <Text style={styles.BtnN}>SHOW RESULT</Text>
                  </View>
                </TouchableOpacity>
                :
                  
                  <TouchableOpacity onPress={()=>{
                    showAlert()
                  }}>
                    <View style={{backgroundColor:'red',paddingVertical:10,paddingHorizontal:60,borderRadius:10}}>
                        <Text style={styles.BtnN}>END</Text>
                    </View>
                  </TouchableOpacity>
              }
            </View>
          </View>
          }
        </View>
    
  )
}

export default Quiz

const styles = StyleSheet.create({
  ques:{
    paddingBottom:20,
    fontSize:25,
    fontWeight:'600'
  },
  options:{
    flex:1,
    gap:10
  },
  option:{
    fontSize:18,
    backgroundColor:'gray',
    paddingVertical:10,
    paddingHorizontal:10,
    color:'white',
    borderRadius:10,
    fontWeight:'500'
  },
  bottonBtn:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  BtnS:{
    color:'white',
    fontSize:15,
    
    
    
  },
  BtnN:{
    color:'white',
    fontSize:15,
    
  },
  timerContainer:{
    display:'flex',
    alignItems:'flex-end',
    padding:20
  },
  timerG:{
    backgroundColor:'green',
    width:50,
    fontSize:30,
    paddingVertical:10,
    textAlign:'center',
    borderRadius:50,
    color:'white'
  },
  timerR:{
    backgroundColor:'red',
    width:50,
    fontSize:30,
    paddingVertical:10,
    textAlign:'center',
    borderRadius:50,
    color:'white'
  }
})
