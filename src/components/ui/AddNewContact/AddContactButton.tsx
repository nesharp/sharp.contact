import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IconButton } from "../IconButton";
import plusIcon from "../../../../assets/plusIcon.png";
import { useState } from "react";
import { Modal } from "./Modal";
export const AddContactButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  return (
    <View style={{ width: "100%", height: "100%", position: "absolute" }}>
      <View
        style={{
          position: "absolute",
          bottom: 40,
          right: 30,
        }}
      >
        <IconButton
          icon={plusIcon}
          size="medium"
          onClick={() => {
            setIsModalVisible(!isModalVisible);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          setIsModalVisible(false);
        }}
        style={{
          ...styles.overflow,
          display: isModalVisible ? "flex" : "none",
        }}
      />
      <Modal isModalVisible={isModalVisible}  setIsModalVisible={setIsModalVisible}/>
    </View>
  );
};
const styles = StyleSheet.create({
  overflow: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: "#000000",
    opacity: 0.5,
  },
});
