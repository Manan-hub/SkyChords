import React, { useState } from "react";
import axios, { formToJSON } from "axios";
import { Alert } from "react-native";
import { VStack, Text, Image, Input, Pressable } from "native-base";

const Signup = (props) => {
  const server = axios.create({ baseURL: "http://localhost:5000" });
  const [username, setUsername] = useState("");
  const [password, setPass] = useState("");
  const [cpassword, setCpass] = useState("");
  const [passwordShow, setPassShow] = useState(false);
  const [cpasswordShow, setCPassShow] = useState(false);
  const [EmailShow, setEmailShow] = useState(false);

  const FireApi = async () => {
    console.log(username, password, cpassword);
    if ((username == "") | (password == "") | (cpassword == "")) {
      CheckFields();
      return;
    } else if (password == cpassword) {
      data = {
        user: username,
      };
      const resp = await server
        .post("/getotp", data)
        .then((response) => {
          flag = response.data["flag"];
        })
        .catch((error) => console.log(error));
      console.log(flag);
      if (flag) {
        props.navigation.navigate("otp", {
          username: username,
          password: password,
        });
      } else if (!flag) {
        Alert.alert(
          "Account already Exists",
          "Email you entered is already being used. Try to login?"
        );
      }
    }
  };
  const PasswordMandatory = () => {
    return (
      <VStack>
        <Text color="red.600">Password is mandatory **</Text>
      </VStack>
    );
  };

  const CPasswordMandatory = () => {
    return (
      <VStack>
        <Text color="red.600">Confirm Password is mandatory **</Text>
      </VStack>
    );
  };

  const EmailMandatory = () => {
    return (
      <VStack>
        <Text color="red.600">Email is mandatory **</Text>
      </VStack>
    );
  };

  const CheckFields = () => {
    if (password == "") {
      setPassShow(true);
    }
    if (cpassword == "") {
      setCPassShow(true);
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
        <Text fontSize="30px">Sign up.....</Text>

        {/*email textinput*/}
        <Input
          marginTop="20px"
          paddingLeft="10px"
          backgroundColor="whitesmoke"
          borderRadius="10px"
          placeholder="Your Email"
          onChangeText={(username) => {
            setUsername(username), setEmailShow(false);
          }}
        />
        {EmailShow == true ? <EmailMandatory /> : null}

        {/*password textinput*/}
        <Input
          secureTextEntry={true}
          marginTop="20px"
          paddingLeft="10px"
          backgroundColor="whitesmoke"
          borderRadius="10px"
          placeholder="Your Password"
          onChangeText={(password) => {
            setPass(password), setPassShow(false);
          }}
        />

        {passwordShow == true ? <PasswordMandatory /> : null}

        {/*confirm password textinput*/}
        <Input
          secureTextEntry={true}
          marginTop="20px"
          paddingLeft="10px"
          backgroundColor="whitesmoke"
          borderRadius="10px"
          placeholder="Comfirm Your Password"
          onChangeText={(cpassword) => {
            setCpass(cpassword), setCPassShow(false);
          }}
        />

        {cpasswordShow == true ? <CPasswordMandatory /> : null}

        {/*register button*/}
        <Pressable
          backgroundColor="whitesmoke"
          alignItems="center"
          height="40px"
          borderRadius="10px"
          justifyContent="center"
          marginTop="20px"
          onPress={async () => {
            FireApi();
          }}
        >
          <Text color="black">Register</Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default Signup;
