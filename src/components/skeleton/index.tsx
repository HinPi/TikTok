import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef } from 'react';
import { Animated, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { SKELETON_BGCOLOR, SKELETON_COLOR } from '../../styles/color';

type SkeletonProps = { width: number; height: number; style?: StyleProp<ViewStyle> };

export const Skeleton = ({ width, height, style }: SkeletonProps): JSX.Element => {
  const translateX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    Animated.loop(Animated.timing(translateX, { toValue: width, useNativeDriver: true, duration: 1000 })).start();
  }, []);

  return (
    <View style={[{ width: width, height: height }, styles.container, style]}>
      <Animated.View style={[styles.size, { transform: [{ translateX: translateX }] }]}>
        <LinearGradient
          style={styles.size}
          colors={[SKELETON_BGCOLOR, SKELETON_COLOR, SKELETON_BGCOLOR]}
          start={{ x: 1, y: 1 }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: SKELETON_BGCOLOR, overflow: 'hidden' },
  size: { width: '100%', height: '100%' }
});
