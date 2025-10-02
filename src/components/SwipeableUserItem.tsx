import React, { useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { Avatar } from '@rneui/themed';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { homeScreenStyles as styles } from '../styles/globalStyles';
import { User } from '../types/User';

interface SwipeableUserItemProps {
  user: User;
  isIOS: boolean;
  onDelete: (uuid: string) => void;
}

export default function SwipeableUserItem({ user, isIOS, onDelete }: SwipeableUserItemProps) {
  const swipeableRef = useRef<Swipeable>(null);

  const renderRightActions = () => (
    <Pressable 
      style={styles.deleteButton}
      onPress={() => {
        swipeableRef.current?.close();
        onDelete(user.uuid);
      }}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  );

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      overshootRight={false}
      friction={2}
    >
      <View style={[
        styles.userItem,
        isIOS ? styles.userItemIOS : styles.userItemAndroid
      ]}>
        <Avatar
          rounded
          source={{ uri: user.picture.thumbnail }}
          size="medium"
          containerStyle={isIOS ? styles.avatarIOS : styles.avatarAndroid}
        />
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{user.name.first}</Text>
          <Text style={styles.lastName}>{user.name.last}</Text>
        </View>
      </View>
    </Swipeable>
  );
}