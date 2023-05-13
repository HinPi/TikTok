import { devImageUri, socketUrl } from '@env';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Linking, Platform, TouchableOpacity, View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send, SendProps } from 'react-native-gifted-chat';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { setAdjustPan, setAdjustResize } from 'rn-android-keyboard-adjust';
import { io } from 'socket.io-client';
import { generateUUID } from '../../constants';
import { createMeeting, getToken, initiateCall, updateCallStatus } from '../../handle-api';
import { useStore } from '../../store';
import { SendSvg } from '../../svg-view';
import incomingVideoCall from '../../utils/incoming-video-call';
type Props = NativeStackScreenProps<StackParamList>;

export const ChatScreen = ({ route }: Props): JSX.Element => {
  const { params } = route;
  const http = params?.avatarLarger?.split(':')[0];
  const [messages, setMessages] = useState<any>([]);
  const { token, userName, id: idCaller } = useStore((store) => store.credentials || {});
  const [id, setId] = useState('');
  const [firebaseUserConfig, setfirebaseUserConfig] = useState({});
  const [isCalling, setisCalling] = useState(false);
  const [videosdkToken, setVideosdkToken] = useState('');
  const [videosdkMeeting, setVideosdkMeeting] = useState('');
  const videosdkTokenRef = useRef('');
  const videosdkMeetingRef = useRef('');

  useEffect(() => {
    async function getFCMtoken() {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        const token = await messaging().getToken();
        const querySnapshot = await firestore().collection('users').where('token', '==', token).get();

        const uids = querySnapshot.docs.map((doc) => {
          if (doc && doc?.data()?.callerId) {
            const { token, platform, callerId } = doc?.data();
            setfirebaseUserConfig({
              callerId,
              token,
              platform
            });
          }
          return doc;
        });

        if (uids && uids.length == 0) {
          addUser({ token });
        } else {
          console.log('Token Found');
        }
      }
    }

    async function getTokenAndMeetingId() {
      const videoSDKtoken = getToken();
      const videoSDKMeetingId = await createMeeting({ token: videoSDKtoken });
      setVideosdkToken(videoSDKtoken);
      setVideosdkMeeting(videoSDKMeetingId);
    }
    getFCMtoken();
    getTokenAndMeetingId();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage((remoteMessage: any) => {
      const { callerInfo, videoSDKInfo, type } = JSON.parse(remoteMessage.data.info);
      console.log(remoteMessage);

      switch (type) {
        case 'CALL_INITIATED':
          const incomingCallAnswer = ({ callUUID }: { callUUID: number }) => {
            updateCallStatus({
              callerInfo,
              type: 'ACCEPTED'
            });
            incomingVideoCall.endIncomingcallAnswer();
            setisCalling(false);
            Linking.openURL(`videocalling://meetingscreen/${videoSDKInfo.token}/${videoSDKInfo.meetingId}`).catch((err) => {
              Toast.show(err);
            });
          };

          const endIncomingCall = () => {
            incomingVideoCall.endIncomingcallAnswer();
            updateCallStatus({ callerInfo, type: 'REJECTED' });
          };

          incomingVideoCall.configure(incomingCallAnswer, endIncomingCall);
          incomingVideoCall.displayIncomingCall(callerInfo.name);

          break;
        case 'ACCEPTED':
          setisCalling(false);
          //   navigation.navigate(SCREEN_NAMES.Meeting, {
          //     name: "Person B",
          //     token: videosdkTokenRef.current,
          //     meetingId: videosdkMeetingRef.current,
          //   });
          break;
        case 'REJECTED':
          setisCalling(false);
          break;
        case 'DISCONNECT':
          Platform.OS === 'ios' ? incomingVideoCall.endAllCall() : incomingVideoCall.endIncomingcallAnswer();
          break;
        default:
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const addUser = ({ token }: { token: string }) => {
    const platform = Platform.OS === 'android' ? 'ANDROID' : 'iOS';
    const obj = {
      callerId: idCaller,
      token,
      platform
    };
    firestore()
      .collection('users')
      .add(obj)
      .then(() => {
        setfirebaseUserConfig(obj);
        console.log('User added!');
      });
  };

  videosdkTokenRef.current = videosdkToken;
  videosdkMeetingRef.current = videosdkMeeting;

  const socket = useMemo(
    () =>
      io(socketUrl, {
        extraHeaders: {
          Authorization: `Bearer ${token}`
        }
      }),
    []
  );

  useEffect(() => {
    setAdjustResize();

    socket.on('new_message', (data) => {
      setMessages((previousMessages: []) => [
        {
          _id: generateUUID(24),
          text: data.messages,
          createdAt: new Date(),
          user: {
            _id: data.receiver,
            name: params?.nickName,
            avatar: http === 'https' ? params?.avatarLarger : devImageUri + params?.avatarLarger
          }
        },
        ...previousMessages
      ]);
    });

    return () => {
      setAdjustPan();
      socket.disconnect();
    };
  }, []);

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: '#e2ffff'
          },
          left: {
            color: 'black'
          }
        }}
        wrapperStyle={{
          right: { borderTopRightRadius: 15, backgroundColor: '#00a2c9' },
          left: { borderTopLeftRadius: 15, backgroundColor: '#fff' }
        }}
        containerToPreviousStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15 }
        }}
        containerToNextStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15 }
        }}
        containerStyle={{
          right: { borderTopRightRadius: 15 },
          left: { borderTopLeftRadius: 15 }
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} textInputStyle={{ color: 'black' }} />;
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: []) => GiftedChat.append(previousMessages, messages));
    socket.emit('send_message', { messages: messages[0].text, receiver: params?._id });
  }, []);

  const renderSend = (props: SendProps<never>) => {
    const { text } = props;
    return (
      <Send {...props} disabled={!text}>
        <View style={{ marginBottom: 6, marginRight: 5 }}>
          <SendSvg fill={text ? '#FF0000' : '#D9D9D9'} />
        </View>
      </Send>
    );
  };

  const getCallee = async (num: number) => {
    const querySnapshot = await firestore().collection('users').where('callerId', '==', num.toString()).get();
    return querySnapshot.docs.map((doc) => {
      return doc;
    });
  };

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={(messages: []) => onSend(messages)}
        user={{
          _id: 1
        }}
        keyboardShouldPersistTaps={'handled'}
        alwaysShowSend
        renderSend={renderSend}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        listViewProps={{
          style: {
            backgroundColor: '#f6f6f6'
          }
        }}
      />
      <TouchableOpacity
        onPress={async () => {
          if (params?._id) {
            const data = await getCallee(params?._id as number);
            if (data) {
              if (data.length === 0) {
              } else {
                const { token, platform, APN } = data[0]?.data();
                initiateCall({
                  callerInfo: {
                    userName,
                    ...firebaseUserConfig
                  },
                  calleeInfo: {
                    token,
                    platform
                  },
                  videoSDKInfo: {
                    token: videosdkTokenRef.current,
                    meetingId: videosdkMeetingRef.current
                  }
                });
                setisCalling(true);
              }
            }
          } else {
          }
        }}
        style={{
          height: 50,
          backgroundColor: '#5568FE',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 12,
          marginTop: 16
        }}
      ></TouchableOpacity>
    </>
  );
};
