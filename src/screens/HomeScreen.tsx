// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Platform, RefreshControl } from 'react-native';
import { Avatar } from '@rneui/themed';
import { homeScreenStyles as styles } from '../styles/globalStyles';
import { fetchUsers } from '../services/userApi';
import { saveUsers, loadStoredUsers } from '../services/storage';
import { User } from '../types/User';
import FAB from '../components/FAB';

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const isIOS = Platform.OS === 'ios';
  const [refreshing, setRefreshing] = useState<boolean>(false);

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
      console.log('Fetching users from API...');
      const fetchedUsers = await fetchUsers(10);
      setUsers(fetchedUsers);
      await saveUsers(fetchedUsers);
      console.log('Saved', fetchedUsers.length, 'users to storage');
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handle pull-to-refresh
  const onRefresh = async () => {
    console.log('Refreshing user list...');
    setRefreshing(true);
    await fetchAndSaveUsers();
    setRefreshing(false);
    console.log('Refresh complete');
  };

  // Handle FAB press - add single user to top
  const addSingleUser = async () => {
    try {
      console.log('Adding single user...');
      const newUsers = await fetchUsers(1);
      const updatedUsers = [newUsers[0], ...users]; 
      setUsers(updatedUsers);
      await saveUsers(updatedUsers);
      console.log('✅ Added new user');
    } catch (error) {
      console.error('Error adding user:', error);
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
        refreshControl={
          <RefreshControl 
          refreshing={refreshing} 
          onRefresh={onRefresh} />
        }
        ListEmptyComponent={<Text style={{ color: '#fff', textAlign: 'center', marginTop: 20 }}>No users available.</Text>}
      />
      <FAB onPress={addSingleUser} />
    </View>
  );
}