import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextField } from '../../components/text-field';
import { FriendsSvg } from '../../svg-view';

type Props = NativeStackScreenProps<StackParamList>;

export const FriendsScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FriendsSvg />
        <TextField
          label="Your friends are not available"
          style={{ fontSize: 16, fontWeight: '700', color: '#D9D9D9', marginVertical: 5, marginTop: 15 }}
        />
        <TextField
          label="Your friends's account will appear here"
          style={{ fontSize: 12, color: '#D9D9D9', marginVertical: 5 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    elevation: 1
  },
  menuIcon: { position: 'absolute', right: 15 }
});
