import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { HeaderScreen } from '../../components/header-screen';
import { TextField } from '../../components/text-field';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../device-info';
import { WHITE } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { ArrowBackSvg } from '../../svg-view';
type Props = NativeStackScreenProps<StackParamList, 'Upload'>;

export const UploadScreen = ({ route, navigation }: Props): JSX.Element => {
  const { params } = route;

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <HeaderScreen right={<ArrowBackSvg />} onRightPress={() => {}} />
    });
  }, []);

  return (
    <View>
      <Modal animationType="none" transparent={true} visible={false}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <View style={styles.viewTitle}>
                <TextField label={'Bạn có chắc chắn muốn đăng xuất ?'} style={styles.textTitle} />
              </View>
              <View style={styles.container}>
                <TouchableOpacity style={[styles.button]}>
                  <TextField label={'Hủy bỏ'} style={[styles.textTitle, { ...TYPOGRAPHY_STYLES.Button }]} />
                </TouchableOpacity>
                <View style={styles.verticalLine}></View>
                <TouchableOpacity style={styles.button} onPress={() => {}}>
                  <TextField label={'Xác nhận'} style={[styles.textTitle, { ...TYPOGRAPHY_STYLES.Button, color: 'red' }]} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity style={[styles.elementContainer, styles.shadowContainer]}>
        <View style={[styles.bgIcon]}>
          <ArrowBackSvg />
        </View>
        <TextField label={'Đăng xuất'} style={styles.textLabel} />
        <View style={styles.arrowRight}>
          <ArrowBackSvg />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  container: { flexDirection: 'row', justifyContent: 'space-around' },
  textTitle: { ...TYPOGRAPHY_STYLES.Subhead1, textAlign: 'center' },
  viewTitle: { borderBottomWidth: 0.5, padding: 20 },
  button: { flex: 1, padding: 20 },
  elementContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    height: 81,
    marginHorizontal: 7
  },

  bgIcon: {
    width: 42,
    height: 42,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9EDF7'
  },
  textLabel: { ...TYPOGRAPHY_STYLES.Subhead1, marginLeft: 24 },
  arrowRight: { position: 'absolute', right: 20 },
  shadowContainer: {
    borderRadius: 20,
    backgroundColor: WHITE,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 12
  },
  verticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: '#8f8f8f'
  }
});
