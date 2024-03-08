import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, Button, Text } from "native-base";
import React from "react";
import Home from "./Screens//home";
import Login from "./Screens/login";
import Signup from "./Screens/signup";
import Forgotpass from "./Screens/forgotpass";
import Ip from "./Screens/ip";
import Otp from "./Screens/otp";
import Main from "./Screens/main";
import Newpass from "./Screens/newpass";
import Fpotp from "./Screens/fpotp";
import { UserProvider } from "./hooks/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Logout = async () => {
  console.log("hi");
  await AsyncStorage.removeItem("username");
  await AsyncStorage.removeItem("password");
};
const stack = createStackNavigator();
const Stacknavigator = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        options={{ headerShown: false }}
        name="home"
        component={Home}
      />
      <stack.Screen
        options={{
          // headerShown:
          title: "Main",
          headerStyle: { backgroundColor: "#0096FF" },
          headerRight: () => (
            <Button
              onPress={(props) => {
                Logout();
              }}
              // borderRadius="10px"
              // marginRight="10px"
              // backgroundColor="darkBlue"
            >
              <Text style={{ color: "black" }}>Logout</Text>
            </Button>
          ),
        }}
        name="main"
        component={Main}
      />
      {/* <stack.Screen
        options={{
          title: "Ip",
          headerStyle: { backgroundColor: "#0096FF" },
        }}
        name="ip"
        component={Ip}
      /> */}

      <stack.Screen
        options={{
          title: "Log in",
          headerStyle: { backgroundColor: "#0096FF" },
        }}
        name="login"
        component={Login}
      />
      <stack.Screen
        options={{
          title: "Sign up",
          headerStyle: { backgroundColor: "#0096FF" },
        }}
        name="signup"
        component={Signup}
      />

      <stack.Screen
        options={{
          title: "forgotpass",
          headerStyle: { backgroundColor: "#0096FF" },
        }}
        name="forgotpass"
        component={Forgotpass}
      />
      <stack.Screen
        options={{
          title: "fpotp",
          headerStyle: { backgroundColor: "#0096FF" },
        }}
        name="fpotp"
        component={Fpotp}
      />

      <stack.Screen
        options={{
          title: "otp",
          headerStyle: { backgroundColor: "#0096FF" },
        }}
        name="otp"
        component={Otp}
      />
      <stack.Screen
        options={{
          title: "newpass",
          headerStyle: { backgroundColor: "#0096FF" },
        }}
        name="newpass"
        component={Newpass}
      />

      <stack.Screen
        options={{
          title: "Ip",
          headerStyle: { backgroundColor: "#0096FF" },
        }}
        name="ip"
        component={Ip}
      />
    </stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Stacknavigator />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};
