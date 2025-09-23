import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../types/User";

const USERS_STORAGE_KEY = "random_app_users";

// Save users to AsyncStorage
export const saveUsers = async (users: User[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(users);
    await AsyncStorage.setItem(USERS_STORAGE_KEY, jsonValue);
  } catch (error) {
    console.error('Error saving users:', error);
    throw error;
  }
};

export const getUsersFromStorage = async (): Promise<User[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error("Error getting users from storage:", error);
    return [];
  }
};
