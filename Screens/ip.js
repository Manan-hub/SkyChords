import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

const ip = props => {
  return (
    <View style={styles.Main}>
      <Text style={styles.Instructions}>Enter Your ip.</Text>
      <TextInput style={styles.Textinput} placeholder="Your ip" />
      <TextInput style={styles.Textinput} placeholder="Your port" />

      {/*send button*/}
      <TouchableOpacity
        style={styles.Submit}
        onPress={() => {
          props.navigation.navigate('main');
        }}>
        <Text style={{color: '#0096FF'}}>submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Main: {
    backgroundColor: 'whitesmoke',
    padding: 50,
  },
  Instructions: {
    alignSelf: 'center',
    color: '#0096FF',
    fontSize: 30,
  },
  Textinput: {
    marginTop: 10,
    paddingLeft: 10,
    backgroundColor: '#89CFF0',
    borderRadius: 10,
  },
  Submit: {
    width: 190,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
    marginLeft: 'auto',
  },
});

export default ip;
