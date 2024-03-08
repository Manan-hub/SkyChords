import React, { useState, useContext } from "react";
import { VStack, Text, Image, Input, Pressable } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import axios, { all } from "axios";
import { UserContext } from "../hooks/UserContext";
const Login = (props) => {
  let uid;
  const { userData } = useContext(UserContext);
  const { ip, port } = userData;
  const { setUserData } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [passwordShow, setPassShow] = useState(false);
  const [EmailShow, setEmailShow] = useState(false);
  const url = `http://${ip}:${port}`;
  const server = axios.create({ baseURL: url });

  const storeData = async (data) => {
    try {
      console.log("data =========", data.passw);
      AsyncStorage.setItem("username", data.user);
      AsyncStorage.setItem("password", data.passw);
    } catch (e) {
      console.log(e);
    }
  };

  const FireApi = async () => {
    console.log("server =====", server.defaults.baseURL);
    if ((username == "") | (password == "")) {
      console.log("Empty");
      return;
    }
    data = {
      user: username,
      passw: password,
    };
    const resp = await server
      .post("/login", data)
      .then((response) => {
        flag = response.data["flag"];
        uid = response.data["UID"];
      })
      .catch((error) => console.log(error));
    console.log(flag);
    if (flag == true) {
      storeData(data);
      props.navigation.navigate("main");
      setUserData((prevUserData) => ({ ...prevUserData, uid }));
    } else {
      Alert.alert("Incorrect Credentials!", "Email or password incorrect.");
    }
  };

  const PasswordMandatory = () => {
    return (
      <VStack>
        <Text color="red">Password is mandatory **</Text>
      </VStack>
    );
  };

  const EmailMandatory = () => {
    return (
      <VStack>
        <Text color="red">Email is mandatory **</Text>
      </VStack>
    );
  };

  const CheckFields = () => {
    if (password == "") {
      setPassShow(true);
    }
    if (username == "") {
      setEmailShow(true);
    }
  };

  return (
    <VStack flex="1" backgroundColor="whitesmoke">
      <VStack flex="1" justifyContent="center" alignItems="center">
        <Image
          width="150px"
          height="150px"
          resizeMode="stretch"
          source={require("../Assets/Imgs/l.jpeg")}
        />
      </VStack>
      <VStack
        flex="2"
        backgroundColor="#89CFF0"
        borderTopLeftRadius="30px"
        borderTopRightRadius="30px"
        px="30px"
        py="50px"
      >
        <Text fontSize="30px">Log in.....</Text>

        {/*Email textinput*/}
        <Input
          marginTop="20px"
          paddingLeft=" 10px"
          backgroundColor="whitesmoke"
          borderRadius="10px"
          placeholder="Your Email"
          // onChangeText={newUsername => setUsername(newUsername)}
          onChangeText={(username) => {
            setUsername(username), setEmailShow(false);
          }}
        />
        {EmailShow == true ? <EmailMandatory /> : null}

        {/*password textinput*/}
        <Input
          secureTextEntry={true}
          marginTop="20px"
          paddingLeft=" 10px"
          backgroundColor="whitesmoke"
          borderRadius="10px"
          placeholder="Your Password"
          onChangeText={(password) => {
            setPass(password), setPassShow(false);
          }}
        />

        {passwordShow == true ? <PasswordMandatory /> : null}

        {/*log in button*/}
        <Pressable
          backgroundColor="whitesmoke"
          alignItems="center"
          height="40px"
          borderRadius="10px"
          justifyContent="center"
          marginTop="20px"
          onPress={async () => {
            FireApi();
            CheckFields();
          }}
        >
          <Text color="black">Log in</Text>
        </Pressable>

        {/*forgotpass button*/}
        <Pressable
          marginTop="20px"
          alignSelf="flex-end"
          onPress={() => props.navigation.navigate("forgotpass")}
        >
          <Text color="black">Forgot your password?</Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default Login;
