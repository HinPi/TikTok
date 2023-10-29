import { useMeeting } from '@videosdk.live/react-native-sdk';
import React from 'react';
import { View } from 'react-native';
import { ParticipantList } from './ParticipantList';
import { ControlsContainer } from './control';

export function MeetingView() {
  const { join, leave, toggleWebcam, toggleMic, participants } = useMeeting({});
  const participantsArrId = [...participants.keys()];
  return (
    <View style={{ flex: 1 }}>
      <ParticipantList participants={participantsArrId} />
      <ControlsContainer join={join} leave={leave} toggleWebcam={toggleWebcam} toggleMic={toggleMic} />
    </View>
  );
}
