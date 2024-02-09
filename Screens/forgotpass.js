import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const forgotpass = props => {
  return (
    <View style={styles.MainView}>
      <Text style={styles.EnterYourMail}>Enter Your Email.</Text>
      <Text style={styles.Instructions}>
        we will send you password on your email associated with your account.
      </Text>

      {/*email textinput*/}
      <TextInput style={styles.EmailInput} placeholder="Your Email" />

      {/*send button*/}
      <TouchableOpacity
        style={styles.Sendbtn}
        onPress={() => {
          alert('Check Your Mail');
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
});

export default forgotpass;
