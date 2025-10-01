// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Avatar } from '@rneui/themed';
import { colors } from '../styles/globalStyles';

export default function HomeScreen() {
  const testUser = {
    uuid: 'test-123',
    name: { first: 'Axe', last: 'Mogul Khan' },
    picture: { thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg' }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Random User List</Text>
      
      <View style={styles.userItem}>
        <Avatar
          rounded
          source={{ uri: testUser.picture.thumbnail }}
          size="medium"
        />
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{testUser.name.first}</Text>
          <Text style={styles.lastName}>{testUser.name.last}</Text>
        </View>
      </View>
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
});