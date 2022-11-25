import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ArrowBackSvg } from '../../svg-view';
type Props = NativeStackScreenProps<StackParamList>;

export const UploadScreen = ({ route, navigation }: Props): JSX.Element => {
  const { params } = route;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Post',
      headerLeft: () => (
        <TouchableOpacity onPress={navigation.goBack}>
          <ArrowBackSvg />
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center'
    });
  }, []);

  return <></>;
};
