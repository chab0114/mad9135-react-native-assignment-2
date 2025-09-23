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

// Load users from AsyncStorage
export const loadUsers = async (): Promise<User[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error loading users:', error);
    return []; // Return empty array on error
  }
};

// Clear all saved users (for testing/reset)
export const clearUsers = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(USERS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing users:', error);
    throw error;
  }
};