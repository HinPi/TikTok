import { MeetingConsumer, MeetingProvider } from '@videosdk.live/react-native-sdk';
import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import MeetingContainer from './MeetingContainer';

export default function Meeting({ navigation, route }: any) {
  const token = route?.params.token;
  const meetingId = route?.params.meetingId;
  const micEnabled = route?.params.micEnabled ? route?.params.micEnabled : true;
  const webcamEnabled = route?.params.webcamEnabled ? route?.params.webcamEnabled : true;
  const name = route?.params.name;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#050A0E', padding: 12 }}>
      <MeetingProvider
        config={{
          meetingId: meetingId,
          micEnabled: false,
          webcamEnabled: webcamEnabled,
          name: name
        }}
        token={token}
      >
        <MeetingConsumer
          {...{
            onMeetingLeft: () => {
              Platform.OS == 'ios' && console.log('first');
            }
          }}
        >
          {() => {
            return <MeetingContainer webcamEnabled={true} />;
          }}
        </MeetingConsumer>
      </MeetingProvider>
    </SafeAreaView>
  );
}
