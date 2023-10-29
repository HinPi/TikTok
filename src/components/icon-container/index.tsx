import React from 'react';
import { TouchableOpacity } from 'react-native';

export const IconContainer = ({ backgroundColor, onPress, Icon, style }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        backgroundColor: backgroundColor ? backgroundColor : 'transparent',
        borderRadius: 30,
        height: 60,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Icon />
    </TouchableOpacity>
  );
};
