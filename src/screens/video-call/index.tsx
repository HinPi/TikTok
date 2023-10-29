import { VIDEOSDK_TOKEN } from '@env';
import { MeetingProvider } from '@videosdk.live/react-native-sdk';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { createMeeting } from '../../handle-api';
import { JoinScreen } from './components/joinScreen';
import { MeetingView } from './components/meetingView';

export const AcceptCallingScreen = () => {
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingId = async (id: number) => {
    const meetingId = id == null ? await createMeeting({ token: VIDEOSDK_TOKEN }) : id;
    setMeetingId(meetingId);
    console.log(meetingId);
  };

  return meetingId ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F6FF' }}>
      <MeetingProvider
        config={{
          meetingId,
          micEnabled: false,
          webcamEnabled: true,
          name: 'Test User'
        }}
        token={VIDEOSDK_TOKEN}
      >
        <MeetingView />
      </MeetingProvider>
    </SafeAreaView>
  ) : (
    <JoinScreen getMeetingId={getMeetingId} />
  );
};
