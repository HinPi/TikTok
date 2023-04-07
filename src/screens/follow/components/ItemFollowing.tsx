import { devImageUri } from '@env';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextField } from '../../../components/text-field';
import { PATH } from '../../../constants';
import { useStore } from '../../../store';
import { WHITE } from '../../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../../styles/typography';

export const Item = (props: any) => {
  const { item } = props;
  const { postData } = useStore();
  const { token, id } = useStore((store) => store.credentials || {});
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const http = item.profile.avatarLarger.split(':')[0];
  const [isFollow, setIsFollow] = useState(true);

  const handleFollow = async () => {
    await postData(token, `${PATH.PROFILE}/${item?.profile._id}`);
    setIsFollow(!isFollow);
  };

  const handleNavigate = () => {
    navigation.navigate('OtherProfile', { author: item?.profile._id });
  };

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={handleNavigate} style={{ flexDirection: 'row', flex: 1 }}>
        <Image
          source={{ uri: http === 'https' ? item.profile.avatarLarger : devImageUri + item.profile.avatarLarger }}
          style={styles.imgComment}
        />
        <View style={{ marginLeft: 10, justifyContent: 'center', flex: 1 }}>
          <TextField label={item.profile.nickName} style={[styles.textStyle]} />
          <TextField label={item.profile.uniqueId} style={[styles.textStyle, { color: '#747474', fontSize: 14 }]} />
        </View>
      </TouchableOpacity>
      {item.profile._id !== id ? (
        isFollow === true ? (
          item.isFollowMe === true ? (
            <View style={styles.friendsBtn}>
              <TouchableOpacity style={styles.friendsLabel} onPress={handleFollow}>
                <TextField label={'Friends'} style={styles.text} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.unFollowBtn}>
              <TouchableOpacity style={styles.unFollowLabel} onPress={handleFollow}>
                <TextField label={'Following'} style={styles.text} />
              </TouchableOpacity>
            </View>
          )
        ) : item.isFollowMe === true ? (
          <View style={styles.followBtn}>
            <TouchableOpacity style={styles.followLabel} onPress={handleFollow}>
              <TextField label={'Follow back'} style={[styles.text, { color: WHITE }]} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.followBtn}>
            <TouchableOpacity style={styles.followLabel} onPress={handleFollow}>
              <TextField label={'Follow'} style={[styles.text, { color: WHITE }]} />
            </TouchableOpacity>
          </View>
        )
      ) : null}
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
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  friendsLabel: { borderWidth: 0.5, width: 90, height: 28, justifyContent: 'center', alignItems: 'center' },
  friendsBtn: {
    justifyContent: 'center',
    marginRight: 15
  },
  text: { ...TYPOGRAPHY_STYLES.Body2, color: 'black', lineHeight: 20.71, fontWeight: '700' },
  unFollowLabel: { borderWidth: 0.5, width: 90, height: 28, justifyContent: 'center', alignItems: 'center' },
  unFollowBtn: {
    justifyContent: 'center',
    marginRight: 15
  },
  followLabel: {
    width: 90,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe2c55'
  },
  followBtn: { justifyContent: 'center', marginRight: 15 }
});
