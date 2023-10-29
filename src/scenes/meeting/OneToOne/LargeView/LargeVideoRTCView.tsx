import { MediaStream, RTCView } from '@videosdk.live/react-native-sdk';
import React from 'react';
import { View } from 'react-native';
import Avatar from '../../../../components/avatar';

export const LargeVideoRTCView = ({ stream, displayName, isOn, objectFit, isLocal }: any) => {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 100,
        right: 0,
        height: 650,
        width: 370,
        aspectRatio: 0.7,
        borderRadius: 8,
        borderColor: '#ff0000',
        overflow: 'hidden'
      }}
    >
      {isOn && stream ? (
        <RTCView
          objectFit={objectFit}
          mirror={true}
          style={{ flex: 1, backgroundColor: '#424242' }}
          streamURL={new MediaStream([stream.track]).toURL()}
        />
      ) : (
        <Avatar
          containerBackgroundColor={'#1A1C22'}
          fullName={displayName}
          fontSize={26}
          style={{
            backgroundColor: '#232830',
            height: 70,
            aspectRatio: 1,
            borderRadius: 40
          }}
        />
      )}
    </View>
  );
};
