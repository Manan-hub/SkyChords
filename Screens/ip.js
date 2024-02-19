import axios from "axios";
import React, { useState, useContext } from "react";
import { VStack, Text, Input, Pressable } from "native-base";
import { UserContext } from "../hooks/UserContext";

const Ip = (props) => {
  const { setUserData } = useContext(UserContext);
  const [ip, setip] = useState("");
  const [port, setport] = useState("");
  const handleSave = () => {
    setUserData((prevUserData) => ({ ...prevUserData, ip, port }));
    props.navigation.navigate("home");
  };
  return (
    <VStack flex="1" backgroundColor="whitesmoke" padding="30px">
      <Text alignSelf="center" color="#0096FF" fontSize="20px">
        Enter Your Ip and Port number.
      </Text>
      <Input
        maxLength={5}
        keyboardType="numeric"
        marginTop="20px"
        paddingLeft="10px"
        backgroundColor="#89CFF0"
        borderRadius="10px"
        placeholder="Enter the Ip"
        onChangeText={(text) => {
          setip(text);
        }}
      />
      <Input
        maxLength={5}
        keyboardType="numeric"
        marginTop="20px"
        paddingLeft="10px"
        backgroundColor="#89CFF0"
        borderRadius="10px"
        placeholder="Enter the Port number"
        onChangeText={(text) => {
          setport(text);
        }}
      />
      <Pressable
        width="190px"
        backgroundColor="#89CFF0"
        alignItems="center"
        height="45px"
        borderRadius="10px"
        justifyContent="center"
        marginTop="30px"
        marginLeft="auto"
        onPress={handleSave}
        _pressed={{ backgroundColor: "#c7e1ed" }}
      >
        <Text style={{ color: "#0096FF" }}>Register</Text>
      </Pressable>
      {/*send button*/}
    </VStack>
  );
};

export default Ip;
