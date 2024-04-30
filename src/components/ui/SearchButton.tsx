import {
  Alert,
  Button,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const SearchButton = ({
  icon,
  onClick,
}: {
  icon: ImageProps["source"];
  onClick: (e) => void;
}) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <View style={styles.container}>
        <Image source={icon} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#373C46",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    height: 50,
  },
  icon: {
    height: 40,
    width: 40,
  },
});
