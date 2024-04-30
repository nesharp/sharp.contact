import {
  Image,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export const IconButton = ({
  icon,
  size = "small",
  onClick,
}: {
  icon: ImageProps["source"];
  size?: "small" | "medium";
  onClick?: (e) => void;
}) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, padding: size === "small" ? 10 : 15 }}
      onPress={onClick}
    >
      <Image
        source={icon}
        style={{
          width: size === "small" ? 20 : 40,
          height: size === "small" ? 20 : 40,
          transform: [
            { translateX: size === "small" ? 0 : -1.5 },
            { translateY: size === "small" ? 0 : -1.5 },
          ],
          ...styles.icon,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#494F5B",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  icon: {},
});
