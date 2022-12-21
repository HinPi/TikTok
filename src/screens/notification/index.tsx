import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TextField } from '../../components/text-field';
import { InboxSvg, MessageSvg } from '../../svg-view';

type Props = NativeStackScreenProps<StackParamList>;

export const NotificationScreen = ({ navigation }: Props): JSX.Element => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View style={styles.menuIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('listUser')}>
            <InboxSvg />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <MessageSvg />
        <TextField
          label="Notifications are not available"
          style={{ fontSize: 16, fontWeight: '700', color: 'black', marginVertical: 5, marginTop: 15 }}
        />
        <TextField
          label="Notifications about your account will appear here"
          style={{ fontSize: 12, color: '#7C7D83', marginVertical: 5 }}
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
