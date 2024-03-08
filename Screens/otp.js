import axios from "axios";
import React, { useState,useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { VStack, Text, Input, Pressable } from "native-base";
import { UserContext } from "../hooks/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
const Otp = (props) => {
  let uid;
  const { setUserData } = useContext(UserContext);
  const { userData } = useContext(UserContext);
  const { ip, port} = userData;
  const username = props.route.params["username"];
  const password = props.route.params["password"];
  const [otpShow, setMotp] = useState(false);
  const [otp, setotp] = useState("");
  const server = axios.create({ baseURL: `http://${ip}:${port}` });
  const storeData = async(data) =>{
    try{
      console.log("data =========",data.passw);
      AsyncStorage.setItem('username',data.user);
      AsyncStorage.setItem('password',data.passw);
    }
    catch(e){
      console.log(e);
    }
  }

  const FireApi = async () => {
    if (otp == "") {
      setMotp(true);
      return;
    }
    data = {
      user: username,
      passw: password,
      otp: otp,
    };
    const resp = await server
      .post("/signup", data)
      .then((response) => {
        flag = response.data["flag"];
        uid = response.data['uid'];
      })
      .catch((error) => console.log(error));
    console.log(flag);
    if (flag == true) {
      storeData(data);
      setUserData((prevUserData) => ({ ...prevUserData, uid}));
      props.navigation.navigate("main");
    }
    if (flag == false) {
      Alert.alert("Incorrect OTP", "OTP you entered is incorrect!");
    }
  };

  const OtpMandatory = () => {
    return (
      <VStack>
        <Text color="red.700">OTP is mandatory **</Text>
      </VStack>
    );
  };

  return (
    <VStack
      flex="2"
      backgroundColor="whitesmoke"
      paddingHorizontal="30px"
      paddingVertical="50px"
    >
      <Text alignSelf="center" color="#0096FF" fontSize="30px" marginTop="40px">
        Enter Your OTP.
      </Text>
      <Text alignSelf="center" color="#0096FF" fontSize="15px" marginTop="15px">
        We have sent you the otp in your entered username .wait for a while for
        the otp
      </Text>
      <Input
        maxLength={5}
        keyboardType="numeric"
        marginTop="20px"
        paddingLeft="10px"
        backgroundColor="#89CFF0"
        borderRadius="10px"
        placeholder="Your OTP"
        onChangeText={(text) => {
          setotp(Number(text)), setMotp(false);
        }}
      />
      {otpShow == true ? <OtpMandatory /> : null}
      <Pressable
        width="190px"
        backgroundColor="#89CFF0"
        alignItems="center"
        height="45px"
        borderRadius="10px"
        justifyContent="center"
        marginTop="30px"
        marginLeft="160px"
        onPress={() => {
          FireApi();
        }}
      >
        <Text style={{ color: "#0096FF" }}>Register</Text>
      </Pressable>
      {/*send button*/}
    </VStack>
  );
};
const styles = StyleSheet.create({
  welcome: {
    alignSelf: "center",
    color: "#0096FF",
    fontSize: 30,
    marginTop: 40,
  },
  main: {
    flex: 2,
    backgroundColor: "whitesmoke",
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  button2: {
    width: 190,
    backgroundColor: "#89CFF0",
    alignItems: "center",
    height: 45,
    borderRadius: 10,
    justifyContent: "center",
    marginTop: 30,
    marginLeft: 160,
  },

  img: {
    justifyContent: "center",
    alignSelf: "center",
  },
  textinput: {
    marginTop: 20,
    paddingLeft: 10,
    backgroundColor: "#89CFF0",
    borderRadius: 10,
  },
  welcome2: {
    alignSelf: "center",
    color: "#0096FF",
    fontSize: 15,
    marginTop: 15,
  },
  passwordText: {
    color: "red",
  },
});

export default Otp;
