import { devApiUrl } from '@env';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, Modal, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import { TextField } from '../../components/text-field';
import { TextInput } from '../../components/text-input';
import { PATH } from '../../constants';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../device-info';
import { useStore } from '../../store';
import { WHITE } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { ArrowBackSvg } from '../../svg-view';
type Props = NativeStackScreenProps<StackParamList>;

export const UploadScreen = ({ route, navigation }: Props): JSX.Element => {
  const { params } = route;
  const { token } = useStore((store) => store.credentials || {});
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<string>();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Post',
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack} style={{ marginLeft: 10 }}>
          <ArrowBackSvg />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center'
    });
  }, []);

  const handlePost = () => {
    if (token === undefined) {
      return Toast.show({
        type: 'info',
        position: 'bottom',
        text1: 'Please login first',
        visibilityTime: 2000,
        autoHide: true
      });
    }
    setLoading(!loading);
    RNFetchBlob.fetch(
      'POST',
      devApiUrl + PATH.VIDEO,
      {
        'content-type': 'multipart/form-data',
        Accept: 'multipart/form-data',
        Authorization: `Bearer ${token}`
      },
      [
        {
          name: 'uploaded_file',
          type: 'video/mp4',
          filename: 'tiktok_video.mp4',
          data: RNFetchBlob.wrap(params?.uri as string)
        },
        { name: 'desc', data: inputRef.current }
      ]
    )
      .then((res) => res.json())
      .then((res) => {
        setLoading(!loading);
        if (res.status === 'success') {
          Toast.show({
            type: 'success',
            position: 'bottom',
            text1: 'Upload video success',
            visibilityTime: 2000,
            autoHide: true
          });
        } else {
          console.log('fail to upload');
        }
      })
      .then(() => navigation.goBack())
      .catch((err) => {
        console.log('err', err);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Toast />
        <Modal animationType="none" transparent={true} visible={loading}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size={'large'} color={'black'} />
          </View>
        </Modal>
        <TextInput
          style={{ flexWrap: 'wrap', marginHorizontal: 10 }}
          multiline={true}
          placeholder="Describe your post, add hashtags, or mention creators that inspired you"
          placeholderTextColor={'#787878'}
          onChangeText={(value) => (inputRef.current = value)}
        />
        <View style={styles.followBtn}>
          <TouchableOpacity style={styles.followLabel} onPress={handlePost}>
            <TextField label={'Post'} style={[styles.text, styles.followBtnText]} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  followBtn: { alignItems: 'center', marginTop: 20 },
  followLabel: {
    backgroundColor: '#fe2c55',
    width: 150,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  text: { ...TYPOGRAPHY_STYLES.Subhead1, fontSize: 17, color: 'black', lineHeight: 20.71 },
  followBtnText: { fontWeight: '700', color: WHITE },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent', opacity: 0.7 },
  modalContainer: { height: WINDOW_HEIGHT, width: WINDOW_WIDTH, backgroundColor: '#3333334D', justifyContent: 'center' }
});
