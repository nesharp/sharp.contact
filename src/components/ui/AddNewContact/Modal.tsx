import {
  Alert,
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import photoImage from "../../../../assets/photo.png";
import { Input } from "../Input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IContact } from "../ContactsCatalog";
import phoneIcon from "../../../../assets/phone.png";
import peopleIcon from "../../../../assets/people.png";
// Stores any error message
export const Modal = ({
  isModalVisible,
  setIsModalVisible,
}: {
  isModalVisible: boolean;
  setIsModalVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  const [file, setFile] = useState(null);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // Stores the selected image URI
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      // If permission is denied, show an alert
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera  
               roll permission to upload images.`
      );
    } else {
      // Launch the image library and get
      // the selected image
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        // If an image is selected (not cancelled),
        // update the file state variable
        setFile(result.assets[0].uri);
        // Clear any previous errors
        // setError(null);
      }
    }
  };
  const onCreate = async () => {
    try {
      const contacts: IContact[] = JSON.parse(
        (await AsyncStorage.getItem("contacts")) || "[]"
      );
      await AsyncStorage.setItem(
        "contacts",
        JSON.stringify([
          ...contacts,
          { id: contacts.length, fullName, phoneNumber, avatarUrl: file },
        ])
      );
      setFullName("");
      setPhoneNumber("");
      setFile(null);
      setIsModalVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  // some animation logic
  const translateY = React.useRef(new Animated.Value(1000)).current;
  React.useEffect(() => {
    if (isModalVisible) {
      Animated.timing(translateY, {
        toValue: 5,
        duration: 300,
        useNativeDriver: true, // Optimize for performance
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isModalVisible]);
  return (
    <Animated.View
      style={{
        ...styles.modal,
        transform: [{ translateY }],
      }}
    >
      <View style={styles.miniDivider} />
      {file ? (
        // Display the selected image
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setFile(null);
            }}
          >
            <Text style={{ color: "white" }}>X</Text>
          </TouchableOpacity>
          <Image source={{ uri: file }} style={styles.image} />
        </View>
      ) : (
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Image source={photoImage} style={styles.buttonImage} />
        </TouchableOpacity>
      )}
      <View style={{ width: "90%", marginTop: 50, display: "flex", gap: 10 }}>
        <Input
          placeholder="John Doe"
          bordered
          onChange={(e) => {
            setFullName(e.nativeEvent.text);
          }}
          value={fullName}
          icon={peopleIcon}
        />
        <Input
          placeholder="+380982354877"
          bordered
          onChange={(e) => {
            setPhoneNumber(e.nativeEvent.text);
          }}
          value={phoneNumber}
          icon={phoneIcon}
        />
      </View>
      <TouchableOpacity style={styles.confirmButton} onPress={onCreate}>
        <Text style={styles.confirmButtonText}>Add</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    height: 462,
    left: 0,
    right: 0,
    backgroundColor: "#373C46",
    borderRadius: 18,
    bottom: 0,
    transform: [{ translateY: 5 }],
    display: "flex",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#525866",
  },
  miniDivider: {
    width: 50,
    height: 4,
    borderRadius: 100,
    backgroundColor: "#D9D9D9",
    marginVertical: "auto",
    marginTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  header: {
    fontSize: 20,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#525866",
    width: 150,
    height: 150,
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonImage: {
    height: 90,
    width: 90,
    objectFit: "fill",
    transform: [{ translateY: 5 }],
  },
  imageContainer: {
    borderRadius: 8,
    marginBottom: 16,
    position: "relative",
    marginTop: 30,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  errorText: {
    color: "red",
    marginTop: 16,
  },
  closeButton: {
    height: 25,
    width: 25,
    borderRadius: 100,
    top: -5,
    right: -5,
    backgroundColor: "red",
    position: "absolute",
    zIndex: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#525866",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 7,
    marginTop: 25,
  },
  confirmButtonText: {
    fontSize: 20,
    color: "white",
  },
});
