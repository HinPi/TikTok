import BottomSheet, { BottomSheetBackdrop, TouchableOpacity } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { Ref, forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { TextField } from '../../../components/text-field';

export const Option = forwardRef((props, ref?: Ref<BottomSheet>): JSX.Element => {
  const snapPoints = useMemo(() => ['24%'], []);

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
            <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => {}}>
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
