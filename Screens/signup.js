import React, {useState} from 'react';
import axios, { formToJSON } from 'axios';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Animated,
  Alert
} from 'react-native';

const signup = props => {
  const server = axios.create({baseURL: "http://localhost:5000"})
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [cpassword, setCpass] = useState('');
  const [passwordShow, setPassShow] = useState(false);
  const [cpasswordShow, setCPassShow] = useState(false);
  const [EmailShow, setEmailShow] = useState(false);
  
  const FireApi = async() =>{
    console.log(username,password,cpassword)
    if (username == '' | password == '' | cpassword == ''){
      CheckFields()
      return;
    }
    else if (password == cpassword){
      data = {
        user: username,
      };
      const resp = await server.post('/getotp',data).then((response)=>{flag = response.data['flag']}).catch(error => console.log(error));
      console.log(flag)
      if(flag){
        props.navigation.navigate('otp',{
          username : username,
          password : password,
        })
      }
      else if (!flag){
        Alert.alert("Account already Exists","Email you entered is already being used. Try to login?")
      }
    }
    
  }
  const PasswordMandatory = () =>{
    return(
    <View>
      <Text style ={styles.passwordText}>Password is mandatory **</Text>
    </View>
    )
  }

  const CPasswordMandatory = () =>{
    return(
    <View>
      <Text style ={styles.passwordText}>Confirm Password is mandatory **</Text>
    </View>
    )
  }

  const EmailMandatory = () =>{
    return(
    <View>
      <Text style ={styles.passwordText}>Email is mandatory **</Text>
    </View>
    )
  }

  const CheckFields = () =>{
    if (password == ''){
      setPassShow(true);
    }
    if (cpassword == ''){
      setCPassShow(true);
    }
    if (username == ''){
      setEmailShow(true)
    }
  }

  return (
    <View style={styles.Main}>
      <View style={styles.Header}>
        <Image style={styles.img} source={require('../Assets/Imgs/l.jpeg')} />
      </View>

      <View style={styles.Footer}>
        <Text style={styles.Logintxt}>Sign up.....</Text>

        {/*email textinput*/}
        <TextInput style={styles.Emailinput} placeholder="Your Email" 
        onChangeText={username => {setUsername(username),setEmailShow(false)}}
        />
        {
          EmailShow == true ? <EmailMandatory/> : null
        }


        {/*password textinput*/}
        <TextInput
          secureTextEntry={true}
          style={styles.Passinput}
          placeholder="Your Password"
          onChangeText={password => {setPass(password),setPassShow(false)}}
          />
         
          {
          passwordShow == true ? <PasswordMandatory/> : null
          }

        {/*confirm password textinput*/}
        <TextInput
          secureTextEntry={true}
          style={styles.Passinput}
          placeholder="Comfirm Your Password"
          onChangeText={cpassword => {setCpass(cpassword),setCPassShow(false)}}
        />

        {
          cpasswordShow == true ? <CPasswordMandatory/> : null
        }

        {/*register button*/}
        <TouchableOpacity style={styles.Registerbtn}
          onPress={async() => {
            FireApi()
          }}
        >
          <Text style={{color: 'black'}}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },

  Header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Footer: {
    flex: 2,
    backgroundColor: '#89CFF0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  Emailinput: {
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
  },
  Passinput: {
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: 'whitesmoke',
    borderRadius: 10,
  },
  Registerbtn: {
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
  },
  Logintxt: {
    fontSize: 30,
  },
  passwordText:{
    color : 'red',
  },
});

export default signup;
