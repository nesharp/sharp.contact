import { Alert, StyleSheet, View } from "react-native";
import { Input } from "./Input";
import { SearchButton } from "./SearchButton";
import searchIcon from "../../../assets/search.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IContact } from "./ContactsCatalog";
import AsyncStorage from "@react-native-async-storage/async-storage";
const filterContacts = (contacts: IContact[], prompt: string) => {
  if (prompt === "") return contacts;
  return contacts.filter((contact: IContact) => {
    return (
      contact.fullName.toLowerCase().includes(prompt.toLowerCase()) ||
      contact.phoneNumber.includes(prompt)
    );
  });
};
export const Filters = ({
  contacts,
  setContacts,
}: {
  contacts: IContact[];
  setContacts: Dispatch<SetStateAction<IContact[]>>;
}) => {
  const [prompt, setPrompt] = useState("");

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsFromStorage = JSON.parse(
          (await AsyncStorage.getItem("contacts")) || "[]"
        );
        setContacts(filterContacts(contactsFromStorage, prompt));
      } catch (e) {
        console.log(e);
      }
    };
    const interval = setInterval(() => {
      getContacts();
    }, 1000);
    return () => clearInterval(interval);
  }, [prompt]);
  useEffect(() => {
    const onSearch = async () => {
      const contacts = await JSON.parse(
        (await AsyncStorage.getItem("contacts")) || "[]"
      );
      setContacts(filterContacts(contacts, prompt));
    };
    onSearch();
  }, [prompt]);
  return (
    <View style={styles.container}>
      <View style={{ width: "90%" }}>
        <Input
          placeholder="Search here"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.nativeEvent.text);
          }}
        />
      </View>
      {/* <SearchButton icon={searchIcon} onClick={onSearch} /> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    gap: 10,
  },
});
