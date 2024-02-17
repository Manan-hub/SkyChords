import React, { useState, useEffect } from "react";
import {
  VStack,
  Text,
  Input,
  Pressable,
  Badge,
  HStack,
  Select,
} from "native-base";

// const cars = ["Saab", "Volvo", "BMW", "cff"];
// const cars2 = cars;

const Main = () => {
  //chords come from api should be in array to put it on setChords(data)
  const [chords, setChords] = useState(["", "", "", ""]);
  const [key, setkey] = useState("");
  const [Scale, setScale] = useState("");
  const [arp, setarp] = useState("");
  const [chords_name, setchords_name] = useState("");
  const [favourite_array, setfavourite_array] = useState([]);
  const [favourite, setfavourite] = useState(["aaaa", "aaaa", "aaa"]);
  // useEffect(() => {
  //   setfavourite_array(cars);
  // }, []);

  return (
    <>
      <VStack backgroundColor="whitesmoke" flex={1} px="40px" paddingTop="40px">
        <HStack justifyContent="space-between">
          {chords.map((badgeValue, index) => (
            <Badge
              key={index}
              backgroundColor="#89CFF0"
              w="55px"
              h="180px"
              borderRadius="10px"
              borderWidth="1px"
            >
              {badgeValue}
            </Badge>
          ))}
        </HStack>
        <Badge
          width="260px"
          marginTop="30px"
          backgroundColor="#89CFF0"
          h="45px"
          borderRadius="10px"
          justifyContent="center"
          alignSelf="center"
        >
          {chords_name}
        </Badge>
        <HStack mt="auto">
          <Pressable
            w="80px"
            h="80px"
            backgroundColor="#89CFF0"
            borderRadius="50px"
            justifyContent="center"
            alignItems="center"
            _pressed={{ backgroundColor: "#c7e1ed" }}
          >
            <Text>Play</Text>
          </Pressable>
          <VStack px="10px" space="3">
            <HStack space="4">
              <Select
                shadow={2}
                selectedValue={key}
                minWidth="85px"
                placeholder="Key"
                _selectedItem={{
                  bg: "#89CFF0",
                  borderRadius: "10px",
                  borderWidth: "1px",
                  borderColor: "white",
                }}
                onValueChange={(itemValue) => setkey(itemValue)}
              >
                <Select.Item shadow={2} label="1" value="1" />
              </Select>
              <Select
                shadow={2}
                selectedValue={Scale}
                minWidth="120px"
                placeholder="Scale"
                _selectedItem={{
                  bg: "#89CFF0",
                  borderRadius: "10px",
                  borderWidth: "1px",
                  borderColor: "white",
                }}
                onValueChange={(itemValue) => setScale(itemValue)}
              >
                <Select.Item shadow={2} label="1" value="1" />
              </Select>
            </HStack>
            <Select
              shadow={2}
              selectedValue={arp}
              minWidth="100px"
              placeholder="Arp"
              _selectedItem={{
                bg: "#89CFF0",
                borderRadius: "10px",
                borderWidth: "1px",
                borderColor: "white",
              }}
              onValueChange={(itemValue) => setarp(itemValue)}
            >
              <Select.Item shadow={2} label="1" value="1" />
            </Select>
          </VStack>
        </HStack>
        <HStack justifyContent="space-between" mt="auto">
          <Pressable
            w="150px"
            h="40px"
            backgroundColor="#89CFF0"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
            _pressed={{ backgroundColor: "#c7e1ed" }}
          >
            <Text>.WAV</Text>
          </Pressable>
          <Pressable
            w="150px"
            h="40px"
            backgroundColor="#89CFF0"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
            _pressed={{ backgroundColor: "#c7e1ed" }}
          >
            <Text>.MIDI</Text>
          </Pressable>
        </HStack>
        <HStack justifyContent="center" paddingTop="10px">
          <Pressable
            w="200px"
            h="40px"
            backgroundColor="#89CFF0"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
            _pressed={{ backgroundColor: "#c7e1ed" }}
          >
            <Text>Add To Favourite</Text>
          </Pressable>
        </HStack>
      </VStack>
      <HStack
        justifyContent="center"
        paddingTop="10px"
        bottom="0"
        space={1}
        width="100%"
      >
        <Select
          backgroundColor="#89CFF0"
          borderTopRadius="10px"
          flex={1}
          selectedValue={favourite}
          justifyContent="center"
          alignItems="center"
          placeholder="Favourite"
          _selectedItem={{
            bg: "#89CFF0",
            borderRadius: "10px",
            borderWidth: "1px",
            borderColor: "white",
          }}
          onValueChange={(itemValue) => setfavourite(itemValue)}
        >
          {favourite_array.map((favourite, index) => (
            <Select.Item
              shadow={2}
              label={favourite}
              value={favourite}
              key={index}
            />
          ))}
        </Select>
        <Pressable
          flex={1}
          h="40px"
          backgroundColor="#89CFF0"
          borderTopRadius="10px"
          justifyContent="center"
          alignItems="center"
          _pressed={{ backgroundColor: "#c7e1ed" }}
        >
          <Text>Add To Favourite</Text>
        </Pressable>
      </HStack>
    </>
  );
};

export default Main;
