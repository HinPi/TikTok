import { useParticipant } from '@videosdk.live/react-native-sdk';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { LargeVideoRTCView } from './LargeView/LargeVideoRTCView';

export default function LocalViewContainer({ participantId }: any) {
  const { webcamOn, webcamStream, displayName, setQuality, isLocal } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality('high');
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        height: 750,
        width: 370,
        aspectRatio: 0.7,
        borderRadius: 8,
        borderColor: '#ff0000',
        overflow: 'hidden'
      }}
    >
      <LargeVideoRTCView isOn={webcamOn} stream={webcamStream} displayName={displayName} objectFit={'cover'} isLocal={isLocal} />
    </View>
  );
}
