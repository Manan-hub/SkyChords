import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VStack, Button, Text, Image } from "native-base";
import { UserContext } from "../hooks/UserContext";
import axios, { all } from "axios";

const Home = (props) => {
  let username;
  let password;
  let uid;
  const { userData } = useContext(UserContext);
  const { setUserData } = useContext(UserContext);
  const { ip, port } = userData;
  console.log(ip, port);
  const url = `http://${ip}:${port}`;
  const server = axios.create({ baseURL: url });
  const Login = async () => {
    try {
      username = await AsyncStorage.getItem("username");
      password = await AsyncStorage.getItem("password");
      console.log(username, password);
    } catch (e) {
      console.log(e);
    }
    data = {
      user: username,
      passw: password,
    };
    console.log("data :- ", data);
    const resp = await server
      .post("/login", data)
      .then((response) => {
        console.log(response.data);
        flag = response.data["flag"];
        uid = response.data["UID"];
      })
      .catch((error) => console.log(error));
    console.log(flag);
    if (flag == true) {
      setUserData((prevUserData) => ({ ...prevUserData, uid }));
      props.navigation.navigate("main");
    }
  };
  useEffect(() => {
    Login();
  }, []);
  const to_ip = async () => {
    props.navigation.navigate("ip");
    console.log("to_ip runed");
  };
  return (
    <VStack flex="1" backgroundColor="whitesmoke" padding="60px">
      <TouchableOpacity>
        <Image
          justifyContent="center"
          alignSelf="center"
          source={require("../Assets/Imgs/l.jpeg")}
          alt="Skychordsimg"
        />
      </TouchableOpacity>
      <VStack justifyContent="center" alignItems="center" marginTop="100px">
        <Text alignSelf="center" color="#0096FF" fontSize="40">
          SkyChords
        </Text>

        {/*login button*/}
        <Button
          width="210px"
          backgroundColor="#89CFF0"
          alignItems="center"
          height="40px"
          borderRadius="10px"
          justifyContent="center"
          marginTop="30px"
          onPress={() => props.navigation.navigate("login")}
        >
          <Text style={{ color: "#0096FF", fontSize: 17 }}>Login </Text>
        </Button>

        {/*signup button*/}
        <Button
          width="210px"
          backgroundColor="#89CFF0"
          alignItems="center"
          height="40px"
          borderRadius="10px"
          justifyContent="center"
          marginTop="10px"
          onPress={() => props.navigation.navigate("signup")}
        >
          <Text style={{ color: "#0096FF", fontSize: 17 }}>Sign up</Text>
        </Button>
      </VStack>
    </VStack>
  );
};

export default Home;
