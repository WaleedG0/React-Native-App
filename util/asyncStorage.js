import {AsyncStorage} from 'react-native';

export const loadFromStorage = async key => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  } catch (error) {
    throw error;
  }
};

export const saveToStorage = async (key, value) => {
  try {
    if (!key || !value) return false;
    const item = JSON.stringify(value);
    await AsyncStorage.setItem(key, item);
    return true;
  } catch (error) {
    throw error;
  }
};

export const removeFromStorage = async key => {
  try {
    if (!key) return false;
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    throw error;
  }
};
