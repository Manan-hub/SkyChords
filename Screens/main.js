import React, { useState, useEffect, useContext } from "react";
import SoundPlayer from "react-native-sound-player";
import RNFS from "react-native-fs";
import axios, { all } from "axios";
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
import { UserContext } from "../hooks/UserContext";
// import { pause } from "react-native-track-player/lib/trackPlayer";
// uid = 20240014;
playing = false;
const Main = () => {
  const { userData } = useContext(UserContext);
  const { ip, port, uid } = userData;
  console.log("uid", uid);
  const [url, setURL] = useState("");
  const wavURL = `http://192.168.1.7:80/wav_files/`;
  const midiURL = `http://192.168.1.7:80/midi_files/`;
  const server = axios.create({ baseURL: `http://${ip}:${port}` });
  const [playtext, setplaytext] = useState("Play");
  // adb reverse tcp:8000 tcp:8000
  //chords come from api should be in array to put it on setChords(data)
  const [wfn, setwfn] = useState("");
  const [mfn, setmfn] = useState("");
  const [chords, setChords] = useState(["", "", "", ""]);
  const [key, setkey] = useState("");
  const [Scale, setScale] = useState("");
  const [arp, setarp] = useState("");
  const [chords_name, setchords_name] = useState("");
  const [favourite_array, setfavourite_array] = useState([]);
  const [favourite, setfavourite] = useState(["aaaa", "aaaa", "aaa"]);
  // data = AsyncStorage.getItem(Login_Details);
  // console.log(data);

  const getFavourites = async () => {
    favourites_chords_progression = [];
    favourites_filenames = [];
    console.log("GetFavourite Fired");
    data = { uid: uid };
    const resp = await server
      .post("/getfavourite", data)
      .then((response) => {
        if ((response.data.favourites = [])) {
          Alert.alert("You dont have any favourites!");
        }
        console.log(response.data.favourites);
        for (i = 0; i < response.data.favourites.length; i++) {
          favourites_filenames.push(response.data.favourites[i][0]);
          favourites_chords_progression.push(response.data.favourites[i][1]);
        }
        setfavourite_array(favourites_filenames);
        f = favourites_filenames[favourites_chords_progression.indexOf(1)];
        console.log("F==========", f);
        // setwfn(response.data.filename + ".wav");
        // setmfn(response.data.filename + ".midi");
        // prog = response.data.favourites[0][1];
        // console.log(prog);
        // prog = Array(response.data.prog[0])
        // console.log(response.data.prog)
        setChords(prog);
      })
      .catch((error) => console.log(error));
  };

  const AddFavourite = async () => {
    if (key && Scale && arp) {
      data = { uid: uid, prog: chords, prog_name: chords_name };
      const resp = await server
        .post("/favourite", data)
        .then((response) => {
          if (response.data.flag == true) {
            Alert.alert("Added to Favourites successfully!");
          }
        })
        .catch((error) => console.log(error));
    } else {
      Alert.alert("Generate some music first!");
    }
  };

  // useEffect(() => {
  //   setfavourite_array(cars);
  // }, []);
  const downloadWavFile = () => {
    try {
      if (wfn == "") {
        Alert.alert("Generate or select Favourites first!");
      }
      console.log("download called");
      const { config, fs } = RNFetchBlob;
      let fileName = wfn.replaceAll(":", "_"); // Specify the desired filename here
      console.log(fileName);
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          path: RNFetchBlob.fs.dirs.DownloadDir + "/" + fileName, // Set the path with the desired filename
          description: "downloading file...",
          notification: true,
          // useDownloadManager works with Android only
          useDownloadManager: true,
        },
      };
      config(options)
        .fetch("GET", wavURL + wfn)
        .then((res) => {
          // Alert after successful downloading
          console.log("res -> ", JSON.stringify(res));
          alert("File Downloaded Successfully.");
        });
    } catch (e) {
      console.log(e, "error<=========");
    }
    // const { config, fs } = RNFetchBlob;
    // let RootDir = fs.dirs.DownloadDir;
    // let options = {
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     path: RNFetchBlob.fs.dirs.DownloadDir + `/${wfn}`,
    //     description: "downloading file...",
    //     notification: true,
    //     // useDownloadManager works with Android only
    //     useDownloadManager: true,
    //   },
    // };
    // config(options)
    //   .fetch("GET", url)
    //   .then((res) => {
    //     // Alert after successful downloading
    //     console.log("res -> ", JSON.stringify(res));
    //     alert("File Downloaded Successfully.");
    //   });
  };

  const downloadMidiFile = () => {
    try {
      if (mfn == "") {
        Alert.alert("Generate or select Favourites first!");
      } else {
        console.log("download called");
        const { config, fs } = RNFetchBlob;
        let fileName = mfn.replaceAll(":", "_"); // Specify the desired filename here
        console.log(fileName);
        console.log(midiURL + mfn);
        // let options = {
        //   fileCache: true,
        //   addAndroidDownloads: {
        //     path: RNFetchBlob.fs.dirs.DownloadDir + "/" + fileName, // Set the path with the desired filename
        //     description: "downloading file...",
        //     notification: true,
        //     // useDownloadManager works with Android only
        //     useDownloadManager: true,
        //   },
        // };
        config(options)
          .fetch("GET", midiURL + mfn)
          .then((res) => {
            // Alert after successful downloading
            console.log("res -> ", JSON.stringify(res));
            alert("File Downloaded Successfully.");
          });
      }
    } catch (err) {
      console.log(err, "<== err");
    }

    // console.log("download called");
    // const { config, fs } = RNFetchBlob;
    // let RootDir = fs.dirs.DownloadDir;
    // let options = {
    //   fileCache: true,
    //   addAndroidDownloads: {
    //     path: RNFetchBlob.fs.dirs.DownloadDir + `/${mfn}`,
    //     description: "downloading file...",
    //     notification: true,
    //     // useDownloadManager works with Android only
    //     useDownloadManager: true,
    //   },
    // };
    // config(options)
    //   .fetch("GET", mfn)
    //   .then((res) => {
    //     // Alert after successful downloading
    //     console.log("res -> ", JSON.stringify(res));
    //     alert("File Downloaded Successfully.");
    //   });
  };

  const StreamAudio = async () => {
    console.log("Pressed", wavURL + wfn);
    try {
      SoundPlayer.playUrl(wavURL + wfn);
      SoundPlayer.setVolume(100);
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
      data = { key: key, scale: Scale, arp: arp, uid: uid };
      const resp = await server
        .post("/prog_creator", data)
        .then((response) => {
          console.log(response.data);
          setChords(response.data.chords);
          setchords_name(response.data.wfn);
          setwfn(response.data.wfn);
          setmfn(response.data.mfn);
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

const Main = (props) => {
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
        <Select
          h="45px"
          marginTop="5px"
          width="260px"
          justifyContent="center"
          alignSelf="center"
          borderRadius="10px"
          backgroundColor="#89CFF0"
          selectedValue={favourite}
          placeholder="Click to access Favourite"
          placeholderTextColor="black"
          _selectedItem={{
            bg: "#89CFF0",
            borderRadius: "10px",
            borderWidth: "1px",
            borderColor: "white",
          }}
          onValueChange={(itemValue) => {
            console.log(itemValue);
            setwfn(itemValue + ".wav");
            setmfn(itemValue + ".midi");
            setChords(
              favourites_chords_progression[
                favourites_filenames.indexOf(itemValue)
              ]
            );
            setchords_name(itemValue);
            setURL(wavURL + itemValue + ".wav");
            console.log("Wav file name :- ", wavURL);
          }}
          onOpen={() => {
            getFavourites();
            console.log(favourites_chords_progression, favourites_filenames);
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
          <VStack paddingLeft="10px" space="3">
            <HStack space="3">
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
                minWidth="90px"
                placeholder="Scale"
                _selectedItem={{
                  bg: "#89CFF0",
                  borderRadius: "10px",
                  borderWidth: "1px",
                  borderColor: "white",
                }}
                onValueChange={(itemValue) => {
                  setScale(itemValue);
                }}
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
              minWidth="189px"
              placeholder="Arp"
              _selectedItem={{
                bg: "#89CFF0",
                borderRadius: "10px",
                borderWidth: "1px",
                borderColor: "white",
              }}
              onValueChange={(itemValue) => {
                setwfn();
                setarp(itemValue);
              }}
            >
              <Select.Item shadow={2} label="UP" value="1" />
              <Select.Item shadow={2} label="DOWN" value="2" />
              <Select.Item shadow={2} label="UP/DOWN" value="3" />
              <Select.Item shadow={2} label="DOWN/UP" value="4" />
            </Select>
          </VStack>
        </HStack>
        <HStack
          justifyContent="space-between"
          mt="auto"
          alignItems="center"
          space="2px"
        >
          <Pressable
            w="50%"
            h="40px"
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
            w="50%"
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
            borderRadius="10px"
            flex={1}
            h="40px"
            backgroundColor="#89CFF0"
            justifyContent="center"
            alignItems="center"
            onPress={AddFavourite}
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
        <Pressable
          flex={1}
          w="200px"
          h="50px"
          borderTopRadius="10px"
          backgroundColor="#89CFF0"
          justifyContent="center"
          alignItems="center"
          onPress={generateChords}
          _pressed={{ backgroundColor: "#c7e1ed" }}
        >
          <Text>Generate</Text>
        </Pressable>
      </HStack>
    </>
  );
};

const styles = StyleSheet.create({
  Main: {
    flex: 1,
    backgroundColor: "whitesmoke",
    padding: 60,
  },
  con: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  Skychords: {
    alignSelf: "center",
    color: "#0096FF",
    fontSize: 40,
  },
  //   Login: {
  //     width: 210,
  //     backgroundColor: '#89CFF0',
  //     alignItems: 'center',
  //     height: 40,
  //     borderRadius: 10,
  //     justifyContent: 'center',
  //     marginTop: 30,
  //   },
  //   Signup: {
  //     width: 210,
  //     backgroundColor: '#89CFF0',
  //     alignItems: 'center',
  //     height: 40,
  //     borderRadius: 10,
  //     justifyContent: 'center',
  //     marginTop: 10,
  //   },
  img: {
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default Main;
