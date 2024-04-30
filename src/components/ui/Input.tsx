import {
  Image,
  ImageProps,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export const Input = ({
  icon,
  placeholder,
  onChange,
  bordered,
  value,
}: {
  icon?: ImageProps["source"];
  placeholder: string;
  onChange?: (e) => void;
  bordered?: boolean;
  value?: string;
}) => {
  return (
    <View style={{ ...styles.container, borderWidth: bordered ? 2 : 0 }}>
      {icon && <Image source={icon} style={styles.icon} />}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={"#979695"}
        onChange={(e) => {
          onChange && onChange(e);
        }}
        value={value}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#373C46",
    display: "flex",
    flexDirection: "row",
    borderColor: "#525866",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  input: {
    height: 50,
    width: "100%",
    padding: 0,
    color: "#979695",
    fontSize: 20,
  },
  icon: {
    height: 25,
    width: 25,
    resizeMode: "contain",
    
  },
});
