import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Modal, ScrollView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import { TextField } from '../../components/text-field';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../device-info';
import { useStore } from '../../store';
import { WHITE } from '../../styles/color';
import { ArrowRight, LogOutSvg } from '../../svg-view';

type Props = NativeStackScreenProps<StackParamList>;

export const SettingScreen = ({ route, navigation }: Props): JSX.Element => {
  const { params } = route;
  const { logout } = useStore();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    configureGoogleSign();
  }, []);

  const configureGoogleSign = () => {
    GoogleSignin.configure({
      webClientId: '524899367926-nrfben1eq9ff6dhe0v6odsv1glkgpn4a.apps.googleusercontent.com',
      offlineAccess: false
    });
  };

  const logOut = async () => {
    switch (params?.provider) {
      case 'Google':
        await GoogleSignin.signOut();
        await logout();
        navigation.replace('NativeStack');
      case 'Facebook':
        LoginManager.logOut();
        await logout();
        navigation.replace('NativeStack');
        break;
      default:
        console.log('Somethings went wrong');
    }
  };

  const handleEvent = () => {
    setStatus(!status);
  };
  const LogOutModal = (): JSX.Element => {
    return (
      <Modal animationType="none" transparent={true} visible={status} onRequestClose={handleEvent}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={handleEvent}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.viewTitle}>
                <TextField label={'Are you sure you want log out ?'} style={[styles.textTitle, { fontWeight: '700' }]} />
                <TextField label={`${params?.uniqueId}`} style={[styles.textTitle, { fontWeight: '500' }]} />
              </View>
              <View style={styles.containerModal}>
                <TouchableOpacity style={[styles.button]} onPress={handleEvent}>
                  <TextField label={'Cancel'} style={[styles.textTitle, { fontSize: 14 }]} />
                </TouchableOpacity>
                <View style={styles.verticalLine}></View>
                <TouchableOpacity style={styles.button} onPress={logOut}>
                  <TextField label={'Log out'} style={[styles.textTitle, { color: 'red', fontSize: 14, fontWeight: '700' }]} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <TextField label={'Accout'} style={styles.textLable} />
        <TouchableOpacity onPress={() => setStatus(true)}>
          <View style={styles.itemContainer}>
            <View>
              <LogOutSvg />
            </View>
            <TextField label={'Log out'} style={styles.textItem} />
            <View style={styles.styleIcon}>
              <ArrowRight />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <LogOutModal />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: { backgroundColor: '#f5f5f5', flex: 1 },
  container: { marginTop: 30 },
  textLable: { color: '#85868c', fontSize: 14, fontWeight: '700', marginLeft: 25, marginBottom: 10 },
  itemContainer: {
    backgroundColor: WHITE,
    flexDirection: 'row',
    marginHorizontal: 10,
    paddingHorizontal: 15,
    height: 55,
    alignItems: 'center',
    borderRadius: 5
  },
  textItem: { color: 'black', fontSize: 16, fontWeight: '700', marginLeft: 15 },
  styleIcon: { position: 'absolute', right: 15 },
  modalContainer: { height: WINDOW_HEIGHT, width: WINDOW_WIDTH, backgroundColor: '#3333334D', justifyContent: 'center' },
  modalView: {
    backgroundColor: WHITE,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 22
  },
  textTitle: { textAlign: 'center', color: 'black' },
  viewTitle: { borderBottomWidth: 0.5, padding: 20 },
  containerModal: { flexDirection: 'row', justifyContent: 'space-around' },
  button: { flex: 1, padding: 20 },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#8f8f8f'
  }
});
