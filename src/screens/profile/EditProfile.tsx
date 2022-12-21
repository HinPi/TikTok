import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextField } from '../../components/text-field';
import { useStore } from '../../store';
import { ArrowRight, CameraSvg } from '../../svg-view';

type Props = NativeStackScreenProps<StackParamList>;
type Author = {
  img: string;
  name: string;
  userName: string;
  bio?: string;
};
export const EditProfileScreen = ({ navigation, route }: Props): JSX.Element => {
  const { params } = route;
  const bio = useStore((state) => state.bio);
  const name = useStore((state) => state.name);
  const userName = useStore((state) => state.userName);

  const handleNavigate = ({ data, name, title }: { data?: string; name: string; title: string }) => {
    navigation.navigate('input', { data, name, title });
  };

  return (
    <View style={{ marginHorizontal: 15 }}>
      <View style={styles.view}>
        <TouchableOpacity style={{ alignItems: 'center' }}>
          <Image
            style={styles.avatar}
            source={{
              uri: params?.author.avatarLarger
            }}
          />
          <View style={[styles.avatar, { position: 'absolute', backgroundColor: '#00000070', opacity: 0.5 }]}></View>
          <View style={{ position: 'absolute', top: 45 }}>
            <CameraSvg />
          </View>
        </TouchableOpacity>
        <TextField label="Change photo" style={{ color: 'black', marginTop: 10, fontSize: 15 }} />
      </View>
      <TextField label="About you" style={{ color: 'black', fontSize: 14, opacity: 0.5, marginRight: 7, marginTop: 20 }} />

      <View style={{ marginTop: 10 }}>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}
          onPress={() => handleNavigate({ name: 'nickName', data: name, title: 'Name' })}
        >
          <TextField label="Name" style={{ color: 'black', fontSize: 15, fontWeight: '600' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField label={name} style={{ color: 'black', fontSize: 15, fontWeight: '600', marginRight: 7 }} />
            <ArrowRight height={14} width={14} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}
          onPress={() => handleNavigate({ title: 'User name', name: 'uniqueId', data: userName })}
        >
          <TextField label="Username" style={{ color: 'black', fontSize: 15, fontWeight: '600' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField label={userName} style={{ color: 'black', fontSize: 15, fontWeight: '600', marginRight: 7 }} />
            <ArrowRight height={14} width={14} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 }}
          onPress={() => handleNavigate({ name: 'bio', data: bio, title: 'Bio' })}
        >
          <TextField label="Bio" style={{ color: 'black', fontSize: 15, fontWeight: '600' }} />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextField label={bio} style={{ color: 'black', fontSize: 15, fontWeight: '600', marginRight: 7 }} />
            <ArrowRight height={14} width={14} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff'
  },
  view: { alignItems: 'center', marginTop: 30 }
});
