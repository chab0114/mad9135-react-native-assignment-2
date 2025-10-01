// src/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@rneui/themed';
import { colors } from '../styles/globalStyles';
import { fetchUsers } from '../services/userApi';
import { User } from '../types/User';

export default function HomeScreen() {
  const [users, setUsers] = useState<User[]>([]);

  // Fetch users when component loads
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers(3); // Start with just 3 users
      setUsers(fetchedUsers);
      console.log('Fetched users:', fetchedUsers);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  // Display first user only for now
  const firstUser = users[0];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random User List</Text>
      
      {firstUser ? (
        <View style={styles.userItem}>
          <Avatar
            rounded
            source={{ uri: firstUser.picture.thumbnail }}
            size="medium"
          />
          <View style={styles.nameContainer}>
            <Text style={styles.firstName}>{firstUser.name.first}</Text>
            <Text style={styles.lastName}>{firstUser.name.last}</Text>
          </View>
        </View>
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  nameContainer: {
    marginLeft: 15,
  },
  firstName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  lastName: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  loading: {
    textAlign: 'center',
    color: colors.textSecondary,
  },
});