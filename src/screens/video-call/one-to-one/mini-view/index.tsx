import { useParticipant } from '@videosdk.live/react-native-sdk';
import React, { useEffect } from 'react';
import { MiniVideoRTCView } from './mini-video-rtc-view';

export const MiniViewContainer = ({ participantId }: any) => {
  const { webcamOn, webcamStream, displayName, setQuality, isLocal } = useParticipant(participantId, {});

  useEffect(() => {
    setQuality('high');
  }, []);

  return <MiniVideoRTCView isOn={webcamOn} stream={webcamStream} displayName={displayName} isLocal={isLocal} />;
};
