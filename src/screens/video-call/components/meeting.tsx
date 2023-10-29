import { VIDEOSDK_TOKEN } from '@env';
import { MeetingProvider } from '@videosdk.live/react-native-sdk';
import React from 'react';
import { MeetingView } from './meetingView';

const App = () => {
  return (
    <MeetingProvider
      config={{
        meetingId: 'ppsp-x6a5-d01f',
        micEnabled: true,
        webcamEnabled: true,
        name: "Hiệp's Org"
      }}
      token={VIDEOSDK_TOKEN}
    >
      <MeetingView />
    </MeetingProvider>
  );
};
export default App;
