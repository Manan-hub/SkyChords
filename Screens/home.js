import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';

const home = props => {
  return (
    <View style={styles.Main}>
      <TouchableOpacity onPress={() => props.navigation.navigate('ip')}>
        <Image style={styles.img} source={require('../Assets/Imgs/l.jpeg')} />
      </TouchableOpacity>
      <View style={styles.con}>
        <Text style={styles.Skychords}>SkyCords</Text>

        {/*login button*/}
        <TouchableOpacity
          style={styles.Login}
          onPress={() => props.navigation.navigate('login')}>
          <Text style={{color: '#0096FF', fontSize: 17}}>Login </Text>
        </TouchableOpacity>

        {/*signup button*/}
        <TouchableOpacity
          style={styles.Signup}
          onPress={() => props.navigation.navigate('signup')}>
          <Text style={{color: '#0096FF', fontSize: 17}}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    padding: 60,
  },
  con: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  Skychords: {
    alignSelf: 'center',
    color: '#0096FF',
    fontSize: 40,
  },
  Login: {
    width: 210,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 30,
  },
  Signup: {
    width: 210,
    backgroundColor: '#89CFF0',
    alignItems: 'center',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
  },
  img: {
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export default home;
