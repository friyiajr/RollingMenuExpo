import { FC } from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";

import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface CircleProps {
  index: number;
  color: string;
  position: SharedValue<number>;
  rollButton?: () => void;
  isLead?: boolean;
  rotation?: SharedValue<number>;
}

const images = [
  require("./share.png"),
  require("./mail.png"),
  require("./speaker.png"),
  require("./navigate.png"),
  require("./radio.png"),
];

const colors = [
  "#efbbff",
  "#d896ff",
  "#905583",
  "#be29ec",
  "#800080",
  "#660066",
];

const { width } = Dimensions.get("window");

const dotOffset = width / 6;

const Circle: FC<CircleProps> = ({ color }) => {
  return <View style={{ backgroundColor: color, height: 50, width: 50 }} />;
};

export default function App() {
  const showMessage = (message: string) => {
    "worklet";
    alert(message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container} />
      <View style={styles.menuContainer}>
        <Circle color={colors[0]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  menuContainer: {
    height: 100,
    backgroundColor: "black",
    justifyContent: "center",
  },
  buttonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plusButton: {
    fontSize: 35,
    fontWeight: "bold",
    marginTop: -3,
  },
  buttonImage: {
    height: 20,
    width: 20,
  },
});
