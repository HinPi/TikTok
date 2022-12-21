import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, Keyboard, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { TextField } from '../../../components/text-field';
import { TextInput } from '../../../components/text-input';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../device-info';
import { useStore } from '../../../store';

type Props = NativeStackScreenProps<StackParamList>;

export const InputScreen = ({ navigation, route }: Props): JSX.Element => {
  const { params } = route;
  const [isChange, setIsChange] = useState(true);
  const bio = useStore((state) => state.bio);
  const name = useStore((state) => state.name);
  const userName = useStore((state) => state.userName);
  const inputRef = useRef<string>(params?.data as string);
  const setDataUser = useStore((state) => state.setDataUser);
  const { token } = useStore((store) => store.credentials || {});
  const [loading, setLoading] = useState(false);
  const { patchData } = useStore();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack} style={{ marginLeft: 15 }}>
          <TextField label="Cancel" style={{ fontWeight: '500', color: 'black' }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit} style={{ marginRight: 15 }} disabled={isChange}>
          <TextField
            label="Save"
            style={{ fontWeight: 'bold', color: isChange ? 'black' : '#fe2c55', opacity: isChange ? 0.35 : 1 }}
          />
        </TouchableOpacity>
      )
    });
  }, [isChange]);

  const handleTextChanges = (name: string) => {
    return (val: string) => {
      inputRef.current = val;

      switch (name) {
        case 'nickName':
          if (val === params?.data || val === '') return setIsChange(true);
          return setIsChange(false);
        case 'uniqueId':
          if (val === params?.data || val === '') return setIsChange(true);
          return setIsChange(false);
        case 'bio':
          if (val === params?.data) return setIsChange(true);
          return setIsChange(false);
      }
    };
  };

  const handleSubmit = async () => {
    setLoading(true);
    await patchData(token, { [params?.name as string]: inputRef.current });
    setLoading(false);
    navigation.goBack();
    switch (params?.name) {
      case 'nickName':
        return setDataUser({ name: inputRef.current, bio, userName });
      case 'uniqueId':
        return setDataUser({ name, userName: inputRef.current, bio });
      case 'bio':
        return setDataUser({ name, userName, bio: inputRef.current });
    }
  };

  const input = () => {
    switch (params?.name) {
      case 'nickName':
        return (
          <TextInput
            label={'Name'}
            onChangeText={handleTextChanges('nickName')}
            defaultValue={inputRef.current}
            style={{ backgroundColor: '#FFF' }}
          />
        );
      case 'uniqueId':
        return (
          <TextInput
            label={'User name'}
            onChangeText={handleTextChanges('uniqueId')}
            defaultValue={inputRef.current}
            style={{ backgroundColor: '#FFF' }}
          />
        );
      case 'bio':
        return (
          <TextInput
            onChangeText={handleTextChanges('bio')}
            defaultValue={inputRef.current}
            style={{ backgroundColor: '#FFF' }}
            multiline={true}
            numberOfLines={5}
          />
        );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <Modal animationType="none" transparent={true} visible={loading}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size={'large'} color={'black'} />
          </View>
        </Modal>
        <View style={{ marginHorizontal: 15, marginTop: 20 }}>{input()}</View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: { height: WINDOW_HEIGHT, width: WINDOW_WIDTH, backgroundColor: '#3333334D', justifyContent: 'center' }
});
