import React, { useRef, useState } from 'react';
import { View, Text, Pressable, Animated } from 'react-native';
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
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleDelete = () => {
    swipeableRef.current?.close();
    
    // Fade out animation
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Delete after animation completes
      onDelete(user.uuid);
    });
  };

  const renderRightActions = () => (
    <Pressable 
      style={styles.deleteButton}
      onPress={handleDelete}
    >
      <Text style={styles.deleteText}>Delete</Text>
    </Pressable>
  );

  return (
    <Animated.View style={{ opacity: fadeAnim }}>
      <Swipeable
        ref={swipeableRef}
        renderRightActions={renderRightActions}
        overshootRight={false}
        friction={2}
        rightThreshold={40}
      >
        <View style={[
          styles.userItem,
          isIOS ? styles.userItemIOS : styles.userItemAndroid
        ]}>
          <Avatar
            source={{ uri: user.picture.thumbnail }}
            size="medium"
            containerStyle={[
              isIOS ? styles.avatarIOS : styles.avatarAndroid,
              styles.avatarSquare
            ]}
            avatarStyle={{ borderRadius: 8 }}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.firstName}>{user.name.first}</Text>
            <Text style={styles.lastName}>{user.name.last}</Text>
          </View>
        </View>
      </Swipeable>
    </Animated.View>
  );
}