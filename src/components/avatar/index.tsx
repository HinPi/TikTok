/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Text, View } from 'react-native';

export default function Avatar({ fullName, style, fontSize, containerBackgroundColor }: any) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: containerBackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        overflow: 'hidden'
      }}
    >
      <View
        style={{
          ...style,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: '#FFFFFF'
          }}
        >
          {fullName && fullName.charAt(0).toUpperCase()}
        </Text>
      </View>
    </View>
  );
}
