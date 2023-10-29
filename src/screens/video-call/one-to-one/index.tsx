import { useMeeting } from '@videosdk.live/react-native-sdk';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

import { IconContainer } from '../../../components/icon-container';
import { CallEnd, CameraSwitchSvg, MicOffSvg, MicOnSvg, VideoOffSvg, VideoOnSvg } from '../../../svg-view';
import { LargeViewContainer } from './large-view';
import { LocalViewContainer } from './local-view-container';
import { MiniViewContainer } from './mini-view';

export default function OneToOneMeetingViewer() {
  const { participants, localWebcamOn, localMicOn, leave, changeWebcam, toggleWebcam, toggleMic, meetingId } = useMeeting({
    onError: (data) => {
      const { code, message } = data;
      console.log(`Error: ${code}: ${message}`);
    }
  });

  const participantIds = [...participants.keys()];

  const participantCount = participantIds ? participantIds.length : null;

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '100%'
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                fontSize: 16,
                color: '#FFFFFF'
              }}
            >
              {meetingId ? meetingId : 'xxx - xxx - xxx'}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              changeWebcam();
            }}
          >
            <CameraSwitchSvg height={26} width={26} fill={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </View>
      {/* Center */}
      <View style={{ flex: 1, marginTop: 8, marginBottom: 12 }}>
        {participantCount! > 1 ? (
          <>
            <LargeViewContainer participantId={participantIds[1]} />
            <MiniViewContainer participantId={participantIds[0]} />
          </>
        ) : participantCount === 1 ? (
          <LocalViewContainer participantId={participantIds[0]} />
        ) : (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={'large'} />
          </View>
        )}
      </View>
      {/* Bottom */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly'
        }}
      >
        <IconContainer
          backgroundColor={'red'}
          onPress={() => {
            leave();
          }}
          Icon={() => {
            return <CallEnd height={26} width={26} fill="#FFF" />;
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034'
          }}
          backgroundColor={!localMicOn ? '#FFFFFF' : 'transparent'}
          onPress={() => {
            toggleMic();
          }}
          Icon={() => {
            return localMicOn ? (
              <MicOnSvg height={24} width={24} fill="#FFF" />
            ) : (
              <MicOffSvg height={28} width={28} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034'
          }}
          backgroundColor={!localWebcamOn ? '#FFFFFF' : 'transparent'}
          onPress={() => {
            toggleWebcam();
          }}
          Icon={() => {
            return localWebcamOn ? (
              <VideoOnSvg height={24} width={24} fill="#FFF" />
            ) : (
              <VideoOffSvg height={36} width={36} fill="#1D2939" />
            );
          }}
        />
      </View>
    </>
  );
}
