import { MediaStream, RTCView } from '@videosdk.live/react-native-sdk';
import React from 'react';
import { View } from 'react-native';
import Avatar from '../../../../components/avatar';

export const MiniVideoRTCView = ({ stream, isOn, displayName, isLocal }: any) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 120,
        right: 10,
        height: 160,
        aspectRatio: 0.7,
        borderRadius: 8,
        borderColor: '#ff0000',
        overflow: 'hidden'
      }}
    >
      {isOn && stream ? (
        <RTCView
          objectFit="cover"
          zOrder={1}
          mirror={isLocal ? true : false}
          style={{ flex: 1, backgroundColor: '#424242' }}
          streamURL={new MediaStream([stream.track]).toURL()}
        />
      ) : (
        <Avatar
          fullName={displayName}
          containerBackgroundColor={'#404B53'}
          fontSize={24}
          style={{
            backgroundColor: '#6F767E',
            height: 60,
            aspectRatio: 1,
            borderRadius: 40
          }}
        />
      )}
    </View>
  );
};
