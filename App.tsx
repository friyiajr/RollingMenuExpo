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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Circle: FC<CircleProps> = ({
  index,
  color,
  position,
  rollButton,
  isLead,
  rotation,
}) => {
  const defaultSharedValue = useSharedValue(dotOffset * index + 6);
  const calculatedPosition = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    calculatedPosition.value = withSpring(position.value, {
      stiffness: 50,
      mass: 0.7,
    });

    const scaleValue =
      calculatedPosition.value - 3 > defaultSharedValue.value ? 1 : 0;

    const restDisplacementNumber =
      calculatedPosition.value - 3 > defaultSharedValue.value ? 1 : 20;

    if (isLead && calculatedPosition.value <= 10) {
      rotation!.value = 0;
    } else if (isLead) {
      rotation!.value = Math.PI * (calculatedPosition.value / width) * 1.5;
    }

    return {
      position: "absolute",
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: color,
      zIndex: isLead ? 10 : 1,
      left: isLead ? undefined : defaultSharedValue.value,
      justifyContent: "center",
      alignItems: "center",
      transform: [
        {
          scale: isLead
            ? 1
            : withSpring(scaleValue, {
                mass: 0.5,
                restDisplacementThreshold: restDisplacementNumber,
              }),
        },
        {
          translateX: isLead
            ? withSpring(position.value, {
                stiffness: 50,
                mass: 0.7,
              })
            : 1,
        },
        {
          rotate: isLead ? withSpring(`${rotation!.value}rad`) : `${0}rad`,
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      style={style}
      onPress={() => {
        isLead || calculatedPosition.value >= 10 ? rollButton?.() : undefined;
      }}
    >
      <View style={styles.buttonContent}>
        {isLead ? (
          <Text style={styles.plusButton}>+</Text>
        ) : (
          <Image
            source={images[index]}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        )}
      </View>
    </AnimatedPressable>
  );
};

export default function App() {
  const position = useSharedValue(3);
  const rotation = useSharedValue(Math.PI);

  const rollButton = () => {
    "worklet";
    if (position.value === dotOffset * 5 + 3) {
      position.value = 6;
    } else {
      position.value = dotOffset * 5 + 3;
    }
  };

  const showMessage = (message: string) => {
    "worklet";
    alert(message);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container} />
      <View style={styles.menuContainer}>
        <Circle
          index={0}
          color={colors[0]}
          position={position}
          rollButton={rollButton}
          rotation={rotation}
          isLead
        />
        <Circle
          index={1}
          color={colors[1]}
          position={position}
          rollButton={() => showMessage("One")}
        />
        <Circle
          index={2}
          color={colors[2]}
          position={position}
          rollButton={() => showMessage("Two")}
        />
        <Circle
          index={3}
          color={colors[3]}
          position={position}
          rollButton={() => showMessage("Three")}
        />
        <Circle
          index={4}
          color={colors[4]}
          position={position}
          rollButton={() => showMessage("Four")}
        />
        <Circle
          index={0}
          color={colors[5]}
          position={position}
          rollButton={() => showMessage("Five")}
        />
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
