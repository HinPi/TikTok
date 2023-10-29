import React from 'react';
import { Text, View } from 'react-native';
export const WaitingToJoinView = () => {
  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%'
      }}
    >
      <Text
        style={{
          fontSize: 17,
          color: '#FFFFFF',
          marginTop: 28
        }}
      >
        Creating a room
      </Text>
    </View>
  );
};
