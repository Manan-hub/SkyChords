import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const signup = props => {
  return (
    <View style={styles.Main}>
      <View style={styles.Header}>
        <Image style={styles.img} source={require('../Assets/Imgs/l.jpeg')} />
      </View>

      <View style={styles.Footer}>
        <Text style={styles.Logintxt}>Sign up.....</Text>

        {/*email textinput*/}
        <TextInput style={styles.Emailinput} placeholder="Your Email" />

        {/*password textinput*/}
        <TextInput
          secureTextEntry={true}
          style={styles.Passinput}
          placeholder="Your Password"
        />

        {/*confirm password textinput*/}
        <TextInput
          secureTextEntry={true}
          style={styles.Passinput}
          placeholder="Comfirm Your Password"
        />

        {/*register button*/}
        <TouchableOpacity style={styles.Registerbtn}>
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
});

export default signup;
