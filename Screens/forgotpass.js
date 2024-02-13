import React, {useState} from 'react';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';



const forgotpass = props => {
  const server = axios.create({baseURL: "http://localhost:5000"})
  const [username, setUsername] = useState('');
  const [EmailShow, setEmailShow] = useState(false);
  const FireApi = async() =>{
    if (username == ''){
      setEmailShow(true)
      console.log("Empty");
      return;
    }
    data = {
      user: username,
    };
    const resp = await server.post('/forgotpassword',data).then((response)=>{flag = response.data['flag']}).catch(error => console.log(error));
    console.log(flag)
    if (flag == true){
      props.navigation.navigate('fpotp',{
        username : username,
      })
    }
    else{
      Alert.alert("Incorrect Credentials!","Email incorrect.")
    }
  }

  const EmailMandatory = () =>{
    return(
    <View>
      <Text style ={styles.passwordText}>Email is mandatory **</Text>
    </View>
    )
  }
  
  return (
    <View style={styles.MainView}>
      <Text style={styles.EnterYourMail}>Enter Your Email.</Text>
      <Text style={styles.Instructions}>
        we will send you an otp on your email associated with your account.
      </Text>

      {/*email textinput*/}
      <TextInput style={styles.EmailInput} placeholder="Your Email" 
        onChangeText={username => setUsername(username)}
      />

        {
          EmailShow == true ? <EmailMandatory/> : null
        }

      {/*send button*/}
      <TouchableOpacity
        style={styles.Sendbtn}
        onPress={() => {
          FireApi()
          // props.navigation.navigate('newpass',{
          //   username : username,
          // })
        }}>
        <Text style={{color: '#0096FF'}}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  MainView: {
    backgroundColor: 'whitesmoke',
    padding: 50,
  },
  EnterYourMail: {
    color: '#0096FF',
    fontSize: 30,
    marginBottom: 5,
  },
  Instructions: {
    color: '#0096FF',
    fontSize: 18,
    marginBottom: 30,
  },
  EmailInput: {
    paddingLeft: 10,
    backgroundColor: '#89CFF0',
    borderRadius: 10,
  },
  Sendbtn: {
    width: 190,
    backgroundColor: '#89CFF0',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 'auto',
  },
  passwordText:{
    color : 'red',
  },
});

export default forgotpass;
