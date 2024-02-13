import axios from 'axios';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

const otp = props => {
  const username = props.route.params['username']
  const password = props.route.params['password']
  const [otpShow,setMotp] = useState(false)
  const [otp, setotp] = useState('');
  const server = axios.create({baseURL: "http://localhost:5000"})

  const FireApi = async() =>{
    if (otp == ''){
      setMotp(true)
      return;
    }
    data = {
      user: username,
      passw: password,
      otp : otp
    };
    const resp = await server.post('/signup',data).then((response)=>{flag = response.data['flag']}).catch(error => console.log(error));
    console.log(flag)
    if (flag == true){
      props.navigation.navigate('main')
    }
    if(flag == false){
      Alert.alert("Incorrect OTP","OTP you entered is incorrect!")
    }
  }

  const OtpMandatory = () =>{
    return(
    <View>
      <Text style ={styles.passwordText}>OTP is mandatory **</Text>
    </View>
    )
  }

  return (
    <View style={styles.main}>
      <Text style={styles.welcome}>Enter Your OTP.</Text>
      <Text style={styles.welcome2}>
        We have sent you the otp in your entered username .wait for a while
        for the otp
      </Text>
      <TextInput
        maxLength={5}
        keyboardType="numeric"
        style={styles.textinput}
        placeholder="Your OTP"
        onChangeText={text => {setotp(Number(text)),setMotp(false)}}
      />
      {
          otpShow == true ? <OtpMandatory/> : null
      }
      <TouchableOpacity
        style={styles.button2}
        onPress={() => {
          FireApi()
        }}>
        <Text style={{color: '#0096FF'}}>Register</Text>
      </TouchableOpacity>
      {/*send button*/}
    </View>
  );
};
const styles = StyleSheet.create({
  welcome: {
    alignSelf: 'center',
    color: '#0096FF',
    fontSize: 30,
    marginTop: 40,
  },
  main: {
    flex: 2,
    backgroundColor: 'whitesmoke',
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  button2: {
    width: 190,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 160,
  },

  img: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textinput: {
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: '#89CFF0',
    borderRadius: 10,
  },
  welcome2: {
    alignSelf: 'center',
    color: '#0096FF',
    fontSize: 15,
    marginTop: 15,
  },
  passwordText:{
    color : 'red',
  },
});

export default otp;
