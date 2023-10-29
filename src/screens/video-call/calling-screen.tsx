import { devImageUri } from '@env';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { updateCallStatus } from '../../handle-api';
import { CallEnd } from '../../svg-view';
import { getCallee } from '../chat/ChatScreen';

type Props = NativeStackScreenProps<StackParamList>;

export const CallingScreen = ({ navigation, route }: Props): JSX.Element => {
  const { params } = route;
  const http = params?.avatarLarger?.split(':')[0];

  return (
    <View style={{ flex: 1, justifyContent: 'space-around' }}>
      <View
        style={{
          padding: 35,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 14
        }}
      >
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'rgba(158, 150, 150, .5)'
          }}
          source={{
            uri: http === 'https' ? params?.avatarLarger : devImageUri + params?.avatarLarger
          }}
        />
        <Text
          style={{
            fontSize: 36,
            marginTop: 12,
            color: 'black'
          }}
        >
          {params?.uniqueId}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#D0D4DD'
          }}
        >
          Calling to...
        </Text>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <TouchableOpacity
          onPress={async () => {
            const data = await getCallee(params?._id as number);
            if (data) {
              updateCallStatus({
                callerInfo: data[0]?.data(),
                type: 'DISCONNECT'
              });
              navigation.goBack();
            }
          }}
          style={{
            backgroundColor: '#FF5D5D',
            borderRadius: 30,
            height: 60,
            aspectRatio: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CallEnd width={50} height={12} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
