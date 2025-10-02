// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Platform } from 'react-native';
import { Avatar } from '@rneui/themed';
import { homeScreenStyles as styles } from '../styles/globalStyles';
import { fetchUsers } from '../services/userApi';
import { saveUsers, loadStoredUsers } from '../services/storage';
import { User } from '../types/User';

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const isIOS = Platform.OS === 'ios';
  console.log('Current platform:', Platform.OS, 'isIOS:', isIOS);

  // Load users when component mounts
  useEffect(() => {
    loadInitialUsers();
  }, []);

  // Check storage first, then fetch from API if needed
  const loadInitialUsers = async () => {
    try {
      const savedUsers = await loadStoredUsers();
      
      if (savedUsers.length > 0) {
        console.log('Loading from storage:', savedUsers.length, 'users');
        setUsers(savedUsers);
      } else {
        console.log('No saved users, fetching from API...');
        await fetchAndSaveUsers();
      }
    } catch (error) {
      console.error('Error loading initial users:', error);
    }
  };

  // Fetch from API and save to storage
  const fetchAndSaveUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers(10);
      setUsers(fetchedUsers);
      await saveUsers(fetchedUsers);
      console.log('Saved', fetchedUsers.length, 'users to storage');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Render function for each user item in FlatList
  const renderUserItem = ({ item }: { item: User }) => (
    <View style={[
      styles.userItem,
      isIOS ? styles.userItemIOS : styles.userItemAndroid]}>
      <Avatar
        rounded
        source={{ uri: item.picture.thumbnail }}
        size="medium"
        containerStyle={isIOS ? styles.avatarIOS : styles.avatarAndroid}
      />
      <View style={styles.nameContainer}>
        <Text style={styles.firstName}>{item.name.first}</Text>
        <Text style={styles.lastName}>{item.name.last}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random User List</Text>
      
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.uuid}
      />
    </View>
  );
}