import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import home from './Screens//home';
import Login from './Screens/login';
import signup from './Screens/signup';
import forgotpass from './Screens/forgotpass';
import ip from './Screens/ip';
import otp from './Screens/otp';
import main from './Screens/main';
import newpass from './Screens/newpass';
import fpotp from './Screens/fpotp';

const stack = createStackNavigator();
const Stacknavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        options={{headerShown: false}}
        name="home"
        component={home}
      />

      <stack.Screen
        options={{
          title: 'Main',
          headerStyle: {backgroundColor: '#0096FF'},
        }}
        name="main"
        component={main}
      />

      <stack.Screen
        options={{
          title: 'newpass',
          headerStyle: {backgroundColor: '#0096FF'},
        }}
        name="newpass"
        component={newpass}
      />

      <stack.Screen
        options={{
          title: 'Log in',
          headerStyle: {backgroundColor: '#0096FF'},
        }}
        name="login"
        component={Login}
      />
      <stack.Screen
        options={{
          title: 'Sign up',
          headerStyle: {backgroundColor: '#0096FF'},
        }}
        name="signup"
        component={signup}
      />
      <stack.Screen
        options={{
          title: 'forgotpass',
          headerStyle: {backgroundColor: '#0096FF'},
        }}
        name="forgotpass"
        component={forgotpass}
      />

      <stack.Screen
        options={{
          title: 'fpotp',
          headerStyle: {backgroundColor: '#0096FF'},
        }}
        name="fpotp"
        component={fpotp}
      />

      <stack.Screen
        options={{
          title: 'otp',
          headerStyle: {backgroundColor: '#0096FF'},
        }}
        name="otp"
        component={otp}
      />

      <stack.Screen
        options={{
          title: 'Ip',
          headerStyle: {backgroundColor: '#0096FF'},
        }}
        name="ip"
        component={ip}
      />
    </stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Stacknavigator />
    </NavigationContainer>
  );
};
