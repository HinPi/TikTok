import { useParticipant } from '@videosdk.live/react-native-sdk';
import React, { useEffect } from 'react';
import { LargeVideoRTCView } from './LargeVideoRTCView';

export const LargeViewContainer = ({ participantId }: any) => {
  const { webcamOn, webcamStream, displayName, setQuality, isLocal } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality('high');
  }, []);

  return (
    <LargeVideoRTCView isOn={webcamOn} stream={webcamStream} displayName={displayName} objectFit={'cover'} isLocal={isLocal} />
  );
};
