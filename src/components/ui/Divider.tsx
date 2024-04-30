import { StyleSheet, Text, View } from "react-native";

export const Divider = ({ text }: { text: string }) => {
  return (
    <View style={styles.divider}>
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};
const styles = StyleSheet.create({
  divider: {
    backgroundColor: "#373C46",
    width: "100%",
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  text: {
    color: "#979695",
    fontSize: 17,
  },
});
