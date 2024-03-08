import React, { useState } from "react";
import axios from "axios";
import { VStack, Text, Input, Pressable } from "native-base";

const Forgotpass = (props) => {
  const { userData } = useContext(UserContext);
  const { ip, port} = userData;
  const server = axios.create({ baseURL: `http://${ip}:${port}` });
  const [username, setUsername] = useState("");
  const [EmailShow, setEmailShow] = useState(false);
  const FireApi = async () => {
    if (username == "") {
      setEmailShow(true);
      console.log("Empty");
      return;
    }
    data = {
      user: username,
    };
    const resp = await server
      .post("/forgotpassword", data)
      .then((response) => {
        flag = response.data.forgotpasswordflag;
      })
      .catch((error) => console.log(error));
    console.log("flag hehe",flag);
    if (flag == true) {
      props.navigation.navigate("fpotp", {
        username: username,
      });
    } else {
      Alert.alert("Incorrect Credentials!", "Email incorrect.");
    }
  };

  const EmailMandatory = () => {
    return (
      <VStack>
        <Text color="red.600">Email is mandatory **</Text>
      </VStack>
    );
  };

  return (
    <VStack backgroundColor="whitesmoke" padding="50px">
      <Text color="#0096FF" fontSize="30px" marginBottom="5px">
        Enter Your Email.
      </Text>
      <Text color="#0096FF" fontSize="18px" marginBottom="30px">
        we will send you an otp on your email associated with your account.
      </Text>

      {/*email textinput*/}
      <Input
        paddingLeft="10px"
        backgroundColor="#89CFF0"
        borderRadius="10px"
        placeholder="Your Email"
        onChangeText={(username) => setUsername(username)}
      />

      {EmailShow == true ? <EmailMandatory /> : null}

      {/*send button*/}
      <Pressable
        width="190px"
        backgroundColor="#89CFF0"
        height="45px"
        borderRadius="10px"
        alignItems="center"
        justifyContent="center"
        marginTop="20px"
        marginLeft="auto"
        onPress={() => {
          FireApi();
          // props.navigation.navigate("newpass", {
          //   // username: username,
          // });
        }}
      >
        <Text color="#0096FF">Send</Text>
      </Pressable>
    </VStack>
  );
};

export default Forgotpass;
