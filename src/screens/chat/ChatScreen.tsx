import { devImageUri, socketUrl } from '@env';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Bubble, GiftedChat, InputToolbar, Send, SendProps } from 'react-native-gifted-chat';
import { setAdjustPan, setAdjustResize } from 'rn-android-keyboard-adjust';
import { io } from 'socket.io-client';
import { generateUUID } from '../../constants';
import { useStore } from '../../store';
import { SendSvg } from '../../svg-view';
type Props = NativeStackScreenProps<StackParamList>;

export const ChatScreen = ({ route }: Props): JSX.Element => {
  const { params } = route;
  const http = params?.avatarLarger?.split(':')[0];
  const [messages, setMessages] = useState<any>([]);
  const { token } = useStore((store) => store.credentials || {});
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

  return (
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
  );
};
