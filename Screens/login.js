import React, {useState} from 'react';
import axios, { formToJSON } from 'axios';
// import { VStack } from 'native-base';
import {Alert, ToastAndroid} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { or } from 'react-native-reanimated';



const Login = props => {
  const server = axios.create({baseURL: "http://localhost:5000"})
  const [username, setUsername] = useState('');
  const [password, setPass] = useState('');
  const [passwordShow, setPassShow] = useState(false);
  const [EmailShow, setEmailShow] = useState(false);


  const FireApi = async() =>{
    if (username == '' | password == ''){
      console.log("Empty");
      return;
    }
    data = {
      user: username,
      passw: password,
    };
    const resp = await server.post('/login',data).then((response)=>{flag = response.data['flag']}).catch(error => console.log(error));
    console.log(flag)
    if (flag == true){
      props.navigation.navigate('main')
    }
    else{
      Alert.alert("Incorrect Credentials!","Email or password incorrect.")
    }
  }

  const PasswordMandatory = () =>{
    return(
    <View>
      <Text style ={styles.passwordText}>Password is mandatory **</Text>
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
        <Text style={styles.Logintxt}>Log in.....</Text>

        {/*Email textinput*/}
        <TextInput 
          style={styles.Emailinput}
          placeholder="Your Email"
          // onChangeText={newUsername => setUsername(newUsername)}
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

        {/*log in button*/}
        <TouchableOpacity style={styles.Loginbtn}
          onPress={async() => {
            FireApi()
            CheckFields()
          }}
        >
          <Text style={{color: 'black'}}>Log in</Text>
        </TouchableOpacity>

        {/*forgotpass button*/}
        <TouchableOpacity
          style={styles.Forgotpass}
          onPress={() => props.navigation.navigate('forgotpass')}>
          <Text style={{color: 'black'}}>Forgot your password?</Text>
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
  Loginbtn: {
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
  },
  Forgotpass: {
    marginTop: 20,
    alignSelf: 'flex-end',
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

export default Login;
