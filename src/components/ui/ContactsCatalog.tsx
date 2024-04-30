import { ScrollView, StyleSheet, Text, View } from "react-native";
import { ContactItem } from "./ContactItem";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
export interface IContact {
  id: string;
  fullName: string;
  phoneNumber: string;
  avatarUrl: string;
}
export const ContactsCatalog = ({
  contacts,
  setContacts,
}: {
  contacts: IContact[];
  setContacts: Dispatch<SetStateAction<IContact[]>>;
}) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {contacts.map((contact) => (
          <ContactItem contact={contact} key={contact.id} />
        ))}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 11,
    width: "93%",
    flex: 1,
  },
});
