import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function MenuItem({ title, description, icon, onPress }: any) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 18,
          paddingVertical: 16,
          alignItems: 'center'
        }}
      >
        {icon && (
          <View
            style={{
              marginRight: 14
            }}
          >
            {icon}
          </View>
        )}

        <View
          style={{
            flexDirection: 'column'
          }}
        >
          <Text
            style={{
              color: '#FFFFF'
            }}
          >
            {title}
          </Text>

          {description && (
            <Text
              style={{
                color: '#818181'
              }}
            >
              {description}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
