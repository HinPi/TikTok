import BottomSheet, { BottomSheetVirtualizedList } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextField } from '../../../components/text-field';
export const ModalComment = () => {
  // hooks
  const sheetRef = useRef<BottomSheet>(null);

  // variables
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ['65%'], []);

  // render
  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.itemContainer}>
        <Text>{item}</Text>
      </View>
    ),
    []
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => sheetRef.current?.collapse()}>
        <View>
          <TextField label={'hello'} style={{ color: 'black' }} />
        </View>
      </TouchableOpacity>
      <Portal>
        <BottomSheet ref={sheetRef} snapPoints={snapPoints} enablePanDownToClose index={-1}>
          <BottomSheetVirtualizedList
            data={data}
            keyExtractor={(i) => i}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
            renderItem={renderItem}
            contentContainerStyle={styles.contentContainer}
          />
        </BottomSheet>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    backgroundColor: 'white'
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee'
  }
});
