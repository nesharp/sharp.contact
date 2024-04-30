import { StatusBar } from "expo-status-bar";
import {  Image, StyleSheet,  View } from "react-native";
import logo from "./assets/logo.png";
import {  useState } from "react";
import { Divider } from "./src/components/ui/Divider";
import { ContactsCatalog } from "./src/components/ui/ContactsCatalog";
import { AddContactButton } from "./src/components/ui/AddNewContact/AddContactButton";
import { Filters } from "./src/components/ui/Filters";

export default function App() {
  const [contacts, setContacts] = useState([]);
  
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={logo} style={styles.logoImage} />
      </View>
      <Filters contacts={contacts} setContacts={setContacts} />
      <View
        style={{
          marginTop: 11,
          width: "100%",
        }}
      >
        <Divider text="contact nesterukmisha27@gmail.com" />
      </View>
      <ContactsCatalog contacts={contacts} setContacts={setContacts} />
      <AddContactButton />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",

    backgroundColor: "#323232",
    color: "#fff",
  },
  text: {
    color: "#fff",
  },
  logo: {
    marginTop: 30,
    width: "100%",
    display: "flex",
    alignItems: "center",
    paddingLeft: 25,
  },
  logoImage: {
    width: "70%",
    height: 35,
    resizeMode: "contain",
  },
});
