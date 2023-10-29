import { MediaStream, RTCView } from '@videosdk.live/react-native-sdk';
import React from 'react';
import Avatar from '../../../../components/avatar';

export const LargeVideoRTCView = ({ stream, displayName, isOn, objectFit, isLocal = false }: any) => {
  return isOn && stream ? (
    <RTCView
      objectFit={objectFit}
      mirror={isLocal ? true : false}
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
  );
};
