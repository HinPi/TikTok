import { useNavigation } from '@react-navigation/native';
import { useMeeting } from '@videosdk.live/react-native-sdk';
import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { IconContainer } from '../../../components/icon-container';
import { CallEnd, CameraSwitchSvg, MicOffSvg, MicOnSvg, VideoOffSvg, VideoOnSvg } from '../../../svg-view';
import { LargeViewContainer } from './LargeView';
import LocalViewContainer from './LocalViewContainer';
import { MiniViewContainer } from './MiniView';

export default function OneToOneMeetingViewer() {
  const {
    join,
    participants,
    localWebcamOn,
    localMicOn,
    leave,
    end,
    changeWebcam,
    toggleWebcam,
    toggleMic,
    presenterId,
    localScreenShareOn,
    toggleScreenShare,
    meetingId,
    startRecording,
    stopRecording,
    meeting,
    recordingState,
    enableScreenShare,
    disableScreenShare
  } = useMeeting({
    onError: (data) => {
      const { code, message } = data;
      console.log(`Error: ${code}: ${message}`);
    }
  });
  const navigation = useNavigation();
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
          <View style={{ flexDirection: 'row', height: 750, justifyContent: 'flex-end' }}>
            <TouchableOpacity
              style={{ height: 30, width: 30 }}
              onPress={() => {
                changeWebcam();
              }}
            >
              <CameraSwitchSvg height={20} width={20} fill={'#ffffff'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Center */}
      <View style={{ flex: 1, marginTop: 8, marginBottom: -70 }}>
        {participantCount > 1 ? (
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
            navigation.goBack();
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
