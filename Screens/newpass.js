import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { VStack, Text, Image, Input, Pressable } from "native-base";

const Newpass = (props) => {
  const { userData } = useContext(UserContext);
  const { ip, port} = userData;
  const server = axios.create({ baseURL: `http://${ip}:${port}` });
  const username = props.route.params["username"];
  const [password, setPass] = useState("");
  const [cpassword, setCpass] = useState("");
  const [passwordShow, setPassShow] = useState(false);
  const [cpasswordShow, setCPassShow] = useState(false);
  const [EmailShow, setEmailShow] = useState(false);

  const FireApi = async () => {
    console.log(username, password, cpassword);
    if ((password == "") | (cpassword == "")) {
      CheckFields();
      return;
    } else if (password == cpassword) {
      data = {
        user: username,
        passw: password,
      };
      const resp = await server
        .post("/changepassword", data)
        .then((response) => {
          flag = response.data["flag"];
        })
        .catch((error) => console.log(error));
      console.log(flag);
      if (flag == true) {
        alert("Password Changed, Try to login!");
        props.navigation.navigate("login");
      } else if (flag == false) {
        Alert.alert("Some error has occured try again later");
      }
    }
  };
  const PasswordMandatory = () => {
    return (
      <VStack>
        <Text color="red.700">Password is mandatory **</Text>
      </VStack>
    );
  };

  const CPasswordMandatory = () => {
    return (
      <VStack>
        <Text color="red.700">Confirm Password is mandatory **</Text>
      </VStack>
    );
  };

  const EmailMandatory = () => {
    return (
      <VStack>
        <Text color="red.700">Email is mandatory **</Text>
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
        <Text fontSize="30px">Change Password...</Text>

        {/*email textinput*/}
        {/* <TextInput style={styles.Emailinput} placeholder="Your Email" 
        onChangeText={username => {setUsername(username),setEmailShow(false)}}
        />
        {
          EmailShow == true ? <EmailMandatory/> : null
        } */}

        {/*password textinput*/}
        <Input
          secureTextEntry={true}
          marginTop="20px"
          paddingLeft=" 10px"
          backgroundColor="whitesmoke"
          borderRadius="10px"
          placeholder="Your New Password"
          onChangeText={(password) => {
            setPass(password), setPassShow(false);
          }}
        />

        {passwordShow == true ? <PasswordMandatory /> : null}

        {/*confirm password textinput*/}
        <Input
          secureTextEntry={true}
          marginTop="20px"
          paddingLeft=" 10px"
          backgroundColor="whitesmoke"
          borderRadius="10px"
          placeholder="Comfirm Your New Password"
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
          <Text color="black">Submit</Text>
        </Pressable>
      </VStack>
    </VStack>
  );
};

export default Newpass;
