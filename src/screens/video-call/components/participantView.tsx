import { MediaStream, RTCView, useParticipant } from '@videosdk.live/react-native-sdk';
import { Text, View } from 'react-native';

export function ParticipantView({ participantId }: any) {
  const { webcamStream, webcamOn } = useParticipant(participantId);

  return webcamOn && webcamStream ? (
    <RTCView
      streamURL={new MediaStream([webcamStream.track]).toURL()}
      objectFit={'cover'}
      style={{
        height: 610,
        marginVertical: 8,
        marginHorizontal: 8
      }}
    />
  ) : (
    <View
      style={{
        backgroundColor: 'grey',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Text style={{ fontSize: 16 }}>NO MEDIA</Text>
    </View>
  );
}
