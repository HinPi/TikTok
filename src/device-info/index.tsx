import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } =
  Dimensions.get("window");

export const setItem = (key: string, value: unknown) => {
  AsyncStorage.setItem(key, JSON.stringify(value));
};

export const getItem = (key: string) => {
  return AsyncStorage.getItem(key);
};

export const removeItem = (key: string) => {
  return AsyncStorage.removeItem(key);
};
