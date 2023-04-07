import BottomSheet, { BottomSheetBackdrop, TouchableOpacity } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { forwardRef, Ref, useMemo } from 'react';
import { View } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { TextField } from '../../../components/text-field';
('react-native-image-crop-picker');

export const Option = forwardRef((props, ref?: Ref<BottomSheet>): JSX.Element => {
  const snapPoints = useMemo(() => ['24%'], []);

  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then((image) => {
      console.log(image);
    });
  };

  return (
    <Portal>
      <BottomSheet
        snapPoints={snapPoints}
        enablePanDownToClose
        ref={ref}
        index={-1}
        backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />}
      >
        <View style={{ flex: 1, backgroundColor: '#f8f8f8', justifyContent: 'space-between' }}>
          <View style={{ backgroundColor: '#fff' }}>
            <TouchableOpacity style={{ paddingVertical: 15 }}>
              <TextField label="Take a photo" style={{ fontSize: 14, fontWeight: '700', color: 'black', textAlign: 'center' }} />
            </TouchableOpacity>
            <View style={{ borderBottomWidth: 1, borderColor: 'rgba(158, 150, 150, .2)' }}></View>
            <TouchableOpacity style={{ paddingVertical: 15 }} onPress={openGallery}>
              <TextField
                label="Select from gallery"
                style={{ fontSize: 14, fontWeight: '700', color: 'black', textAlign: 'center' }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ paddingVertical: 15, backgroundColor: '#fff' }} onPress={() => ref?.current.close()}>
            <TextField label="Cancel" style={{ fontSize: 14, color: 'black', textAlign: 'center' }} />
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </Portal>
  );
});
