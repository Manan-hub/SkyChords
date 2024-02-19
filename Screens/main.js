import React, { useState, useEffect } from "react";
import SoundPlayer from "react-native-sound-player";
import RNFS from "react-native-fs";
import axios from "axios";
import RNFetchBlob from "rn-fetch-blob";
import {
  VStack,
  Text,
  Input,
  Pressable,
  Badge,
  HStack,
  Select,
} from "native-base";
import { format } from "react-string-format";
import { Alert, TouchableOpacity } from "react-native";
import { pause } from "react-native-track-player/lib/trackPlayer";
// const cars = ["Saab", "Volvo", "BMW", "cff"];
// const cars2 = cars;
const called = 0;
global.uid = 20240001;
playing = false;
const Main = () => {
  const url = "http://192.168.1.9:80/wav_files/2024-02-18-7777.wav";
  const server = axios.create({ baseURL: "http://localhost:8000" });
  const [playtext, setplaytext] = useState("Play");
  // adb reverse tcp:8000 tcp:8000
  //chords come from api should be in array to put it on setChords(data)
  const [wfn, setwfn] = useState(
    "http://192.168.1.9:80/wav_files/2024-02-18-7777.wav"
  );
  const [mfn, setmfn] = useState(
    "http://192.168.1.9:80/midi_files/2024-02-18-7777.midi"
  );
  const [chords, setChords] = useState(["", "", "", ""]);
  const [key, setkey] = useState("");
  const [Scale, setScale] = useState("");
  const [arp, setarp] = useState("");
  const [chords_name, setchords_name] = useState("");
  const [favourite_array, setfavourite_array] = useState([]);
  const [favourite, setfavourite] = useState(["aaaa", "aaaa", "aaa"]);

  const getFavourites = async () => {
    console.log("GetFavourite Fired");
    data = { uid: global.uid };
    const resp = await server
      .post("/getfavourite", data)
      .then((response) => {
        console.log(response.data.favourites);
        setwfn(response.data.filename + ".wav");
        setmfn(response.data.filename + ".midi");
        prog = response.data.favourites[0][1];
        console.log(prog);
        // prog = Array(response.data.prog[0])
        // console.log(response.data.prog)
        setChords(prog);
      })
      .catch((error) => console.log(error));
  };

  const AddFavourite = async () => {
    data = { uid: global.uid, prog: chords, prog_name: chords_name };
    const resp = await server
      .post("/favourite", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  // useEffect(() => {
  //   setfavourite_array(cars);
  // }, []);
  const downloadWavFile = () => {
    console.log("download called");
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: RNFetchBlob.fs.dirs.DownloadDir + "s",
        description: "downloading file...",
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch("GET", url)
      .then((res) => {
        // Alert after successful downloading
        console.log("res -> ", JSON.stringify(res));
        alert("File Downloaded Successfully.");
      });
  };

  const downloadMidiFile = () => {
    console.log("download called");
    const { config, fs } = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path: RNFetchBlob.fs.dirs.DownloadDir + "s",
        description: "downloading file...",
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch("GET", mfn)
      .then((res) => {
        // Alert after successful downloading
        console.log("res -> ", JSON.stringify(res));
        alert("File Downloaded Successfully.");
      });
  };

  const StreamAudio = async () => {
    console.log("Pressed");
    try {
      SoundPlayer.playUrl(url);
    } catch (e) {
      console.log(`cannot play the sound file`, e);
    }
    _onFinishedPlayingSubscription = SoundPlayer.addEventListener(
      "FinishedPlaying",
      ({ success }) => {
        playing = false;
        setplaytext("Play");
      }
    );

    if (!playing) {
      SoundPlayer.play();
      playing = true;
      setplaytext("Pause");
    } else if (playing) {
      SoundPlayer.pause();
      playing = false;
      setplaytext("Play");
    }
  };
  const generateChords = async () => {
    if (key && Scale && arp) {
      console.log(key, Scale, arp);
      data = { key: key, scale: Scale, arp: arp, uid: global.uid };
      const resp = await server
        .post("/prog_creator", data)
        .then((response) => {
          console.log(response.data);
          setChords(response.data.chords);
          setchords_name(response.data.wfn);
        })
        .catch((error) => console.log(error));
    } else {
      Alert.alert(
        format(
          "Fill the required fields :- {0} {1} {2}",
          !key ? "Key" : "",
          !Scale ? "Scale" : "",
          !arp ? "Arp" : ""
        )
      );
    }
  };

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
          <Text>{chords_name}</Text>
        </Badge>
        <HStack mt="auto">
          <Pressable
            w="80px"
            h="80px"
            backgroundColor="#89CFF0"
            borderRadius="50px"
            justifyContent="center"
            alignItems="center"
            onPress={StreamAudio}
            _pressed={{ backgroundColor: "#c7e1ed" }}
          >
            <Text>{playtext}</Text>
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
                <Select.Item shadow={2} label="C" value="C" />
                <Select.Item shadow={2} label="C#" value="C#" />
                <Select.Item shadow={2} label="D" value="D" />
                <Select.Item shadow={2} label="D#" value="D#" />
                <Select.Item shadow={2} label="E" value="E" />
                <Select.Item shadow={2} label="F" value="F" />
                <Select.Item shadow={2} label="F#" value="F#" />
                <Select.Item shadow={2} label="G" value="G" />
                <Select.Item shadow={2} label="G#" value="G#" />
                <Select.Item shadow={2} label="A" value="A" />
                <Select.Item shadow={2} label="A#" value="A#" />
                <Select.Item shadow={2} label="B" value="B" />
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
                <Select.Item shadow={2} label="Major" value="1" />
                <Select.Item shadow={2} label="Minor" value="2" />
                <Select.Item shadow={2} label="Harmonic Major" value="3" />
                <Select.Item shadow={2} label="Harmonic Minor" value="4" />
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
              <Select.Item shadow={2} label="UP" value="1" />
              <Select.Item shadow={2} label="DOWN" value="2" />
              <Select.Item shadow={2} label="UP/DOWN" value="3" />
              <Select.Item shadow={2} label="DOWN/UP" value="4" />
            </Select>
          </VStack>
        </HStack>
        <HStack justifyContent="space-between" mt="auto">
          <Pressable
            w="150px"
            h="40px"
            marginLeft="0px"
            backgroundColor="#89CFF0"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
            onPress={downloadWavFile}
            _pressed={{ backgroundColor: "#c7e1ed" }}
          >
            <Text>.WAV</Text>
          </Pressable>
          <Pressable
            w="150px"
            h="40px"
            backgroundColor="#89CFF0"
            borderRadius="10px"
            onPress={downloadMidiFile}
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
            onPress={generateChords}
            _pressed={{ backgroundColor: "#c7e1ed" }}
          >
            <Text>Generate</Text>
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
          flex={1}
          backgroundColor="#89CFF0"
          borderTopRadius="10px"
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
          onOpen={() => {
            console.log("hiii");
          }}
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
          onPress={AddFavourite}
          _pressed={{ backgroundColor: "#c7e1ed" }}
        >
          <Text>Add To Favourite</Text>
        </Pressable>
      </HStack>
    </>
  );
};

export default Main;
