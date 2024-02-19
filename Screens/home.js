import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";
import { VStack, Button, Text, Image } from "native-base";
import { UserContext } from "../hooks/UserContext";

const Home = (props) => {
  // const { userData } = useContext(UserContext);
  // const { ip, port } = userData;
  const to_ip = () => {
    props.navigation.navigate("ip");
    console.log("to_ip runed");
  };

  return (
    <VStack flex="1" backgroundColor="whitesmoke" padding="60px">
      <TouchableOpacity onPress={to_ip}>
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
