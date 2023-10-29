import { useParticipant } from '@videosdk.live/react-native-sdk';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { LargeVideoRTCView } from './large-view/large-video-rtc-view';

export const LocalViewContainer = ({ participantId }: any) => {
  const { webcamOn, webcamStream, displayName, setQuality, isLocal } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality('high');
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1A1C22',
        borderRadius: 12,
        overflow: 'hidden'
      }}
    >
      <LargeVideoRTCView isOn={webcamOn} stream={webcamStream} displayName={displayName} objectFit={'cover'} isLocal={isLocal} />
    </View>
  );
};
