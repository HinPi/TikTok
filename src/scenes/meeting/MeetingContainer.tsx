import { ReactNativeForegroundService, useMeeting } from '@videosdk.live/react-native-sdk';
import React, { useEffect, useState } from 'react';
import OneToOneMeetingViewer from './OneToOne';
import ParticipantLimitViewer from './OneToOne/ParticipantLimitViewer';
import WaitingToJoinView from './components/WaitingToJoinView';

export default function MeetingContainer({ webcamEnabled }: { webcamEnabled: boolean }) {
  const [isJoined, setJoined] = useState(false);
  const [participantLimit, setParticipantLimit] = useState(false);

  const { join, changeWebcam, participants, leave } = useMeeting({
    onMeetingJoined: () => {
      setTimeout(() => {
        setJoined(true);
      }, 500);
    },
    onParticipantLeft: () => {
      if (participants.size < 2) {
        setParticipantLimit(false);
      }
    }
  });

  useEffect(() => {
    if (isJoined) {
      if (participants.size > 2) {
        setParticipantLimit(true);
      }
    }
  }, [isJoined]);

  useEffect(() => {
    setTimeout(() => {
      if (!isJoined) {
        join();
        if (webcamEnabled) changeWebcam();
      }
    }, 1000);

    return () => {
      leave();
      ReactNativeForegroundService.stopAll();
    };
  }, []);

  return isJoined ? participantLimit ? <ParticipantLimitViewer /> : <OneToOneMeetingViewer /> : <WaitingToJoinView />;
}
