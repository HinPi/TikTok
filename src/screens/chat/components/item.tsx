import { devImageUri } from '@env';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextField } from '../../../components/text-field';
import { TYPOGRAPHY_STYLES } from '../../../styles/typography';
import { ArrowRight } from '../../../svg-view';

export const Item = (props: any) => {
  const { item } = props;
  const http = item.avatarLarger.split(':')[0];
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

  const handleNavigate = () => navigation.navigate('chat', item);

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handleNavigate} style={{ flexDirection: 'row', flex: 1 }}>
        <Image
          source={{ uri: http === 'https' ? item.avatarLarger : devImageUri + item.avatarLarger }}
          style={styles.imgComment}
        />
        <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1 }}>
          <TextField label={item.nickName} style={[styles.textStyle]} />
          <TextField label={item.uniqueId} style={[styles.textStyle, { color: '#747474', fontSize: 14 }]} />
        </View>
        <View style={styles.arrowIcn}>
          <ArrowRight />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 7,
    marginVertical: 7
  },
  imgComment: { width: 55, height: 55, borderRadius: 50, borderWidth: 2, borderColor: '#fff', marginLeft: 5 },
  textStyle: { ...TYPOGRAPHY_STYLES.Subhead1, color: 'black' },
  arrowIcn: {
    justifyContent: 'center',
    marginRight: 15
  }
});
