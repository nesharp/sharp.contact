import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconButton } from "./IconButton";
import arrowRightIcon from "../../../assets/arrowRight.png";
import { IContact } from "./ContactsCatalog";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const ContactItem = ({ contact }: { contact: IContact }) => {
  const onLongPress = async () => {
    const removeContact = async () => {
      const contacts: IContact[] = JSON.parse(
        (await AsyncStorage.getItem("contacts")) || "[]"
      );
      const newContacts = contacts.filter((c) => c.id !== contact.id);
      await AsyncStorage.setItem("contacts", JSON.stringify(newContacts));
    };
    Alert.alert("Delete", "Are you sure you want to delete this contact?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          removeContact();
        },
      },
    ]);
  };
  return (
    <TouchableOpacity style={styles.container} onLongPress={onLongPress}>
      <Image source={{ uri: contact.avatarUrl }} style={styles.image} />
      <View style={styles.aboutBlock}>
        <Text style={{ color: "#E5E5E5", fontSize: 17, marginLeft: 5 }}>
          {contact.fullName}
        </Text>
        <Text style={{ color: "#979695", fontSize: 14 }}>
          {contact.phoneNumber}
        </Text>
      </View>
      <View style={{ position: "absolute", right: 20 }}>
        <IconButton
          icon={arrowRightIcon}
          onClick={() => {
            Linking.openURL(`tel:${contact.phoneNumber}`);
            
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    marginBottom: 11,
    height: 86,
    width: "100%",
    backgroundColor: "#373C46",
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  image: { width: 58, height: 58, borderRadius: 100, marginRight: 10 },
  aboutBlock: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 3,
  },
});
