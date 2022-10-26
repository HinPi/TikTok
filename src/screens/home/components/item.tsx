import BottomSheet, { BottomSheetBackdrop, BottomSheetTextInput, BottomSheetVirtualizedList } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Keyboard, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import { TextField } from '../../../components/text-field';
import { WINDOW_HEIGHT } from '../../../device-info';
import { DARK_RED } from '../../../styles/color';

export const Item = ({ data, isActive }: any): JSX.Element => {
  const navigation = useNavigation();
  const { uri } = data;
  const ref = useRef<any>();
  const [paused, setPaused] = useState<boolean>(false);
  const sheetRef = useRef<BottomSheet>(null);
  const datas = useMemo(
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
        <TextField label={item} />
      </View>
    ),
    []
  );

  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      ref.current.setNativeProps({ paused: true });
    });

    const focus = navigation.addListener('focus', () => {
      ref.current.setNativeProps({ paused: false });
    });

    return () => {
      navigation.removeListener('blur', blur);
      navigation.removeListener('focus', focus);
    };
  }, [navigation]);

  const handlePausePlay = () => {
    setPaused(!paused);
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlePausePlay}>
          <Video
            source={{
              uri: uri
            }}
            ref={ref}
            style={styles.video}
            resizeMode={'cover'}
            onError={(error) => console.log(error)}
            repeat={true}
            paused={!isActive || paused}
          />
        </TouchableWithoutFeedback>

        <View style={styles.uiContainer}>
          <View style={styles.rightContainer}>
            <View>
              <Image
                style={styles.profilePicuter}
                source={{
                  uri: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/271944201_3152722211664631_8159158506795822795_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lFCoUOK4UmcAX_31mCj&_nc_ht=scontent.fdad3-5.fna&oh=00_AT_NBorIAuvUEI6BgABrQq5HFZ_xHkvHo6SIZQXyXNwN0Q&oe=635E5634'
                }}
              />
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name={'heart-outline'} size={35} />
              <Text style={styles.statsLabel}>10</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => sheetRef.current?.collapse()}>
                <FontAwesome name={'commenting-o'} size={35} />
              </TouchableOpacity>
              <Text style={styles.statsLabel}>10</Text>
              <Portal>
                <BottomSheet
                  keyboardBehavior="extend"
                  keyboardBlurBehavior="restore"
                  ref={sheetRef}
                  snapPoints={snapPoints}
                  enablePanDownToClose
                  index={-1}
                  backdropComponent={(props) => (
                    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} onPress={Keyboard.dismiss} />
                  )}
                >
                  <BottomSheetVirtualizedList
                    data={datas}
                    keyExtractor={(i) => i}
                    getItemCount={(data) => data.length}
                    getItem={(data, index) => data[index]}
                    renderItem={renderItem}
                    contentContainerStyle={styles.contentContainer}
                  />
                  <View style={styles.containerComment}>
                    <Image
                      style={styles.imgComment}
                      source={{
                        uri: 'https://scontent.fdad3-5.fna.fbcdn.net/v/t39.30808-6/271944201_3152722211664631_8159158506795822795_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=lFCoUOK4UmcAX_31mCj&_nc_ht=scontent.fdad3-5.fna&oh=00_AT_NBorIAuvUEI6BgABrQq5HFZ_xHkvHo6SIZQXyXNwN0Q&oe=635E5634'
                      }}
                    />
                    <BottomSheetTextInput
                      style={styles.textInput}
                      selectionColor={DARK_RED}
                      placeholder={'Add comment...'}
                      placeholderTextColor={'#a8a8ac'}
                    />
                  </View>
                </BottomSheet>
              </Portal>
            </View>

            <TouchableOpacity onPress={() => console.log('first')}>
              <View style={styles.iconContainer}>
                <Fontisto name={'share-a'} size={35} />
                <Text style={styles.statsLabel}>10</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.handle}>@ThuxBao</Text>
              <Text style={styles.description}>Ghi vô</Text>
              <View style={styles.songRow}>
                <Entypo name={'beamed-note'} size={24} />
                <Text numberOfLines={1} style={styles.songName}>
                  Chỉ là quá khứ
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: { backgroundColor: 'black', flex: 1 },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  container: {
    width: '100%',
    height: WINDOW_HEIGHT - 48
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end'
  },
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 5,
    marginBottom: 30
  },
  bottomContainer: {
    padding: 10
  },
  handle: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '300'
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  songName: {
    marginLeft: 5,
    fontSize: 16,
    width: '50%'
  },
  profilePicuter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff'
  },
  iconContainer: {
    alignItems: 'center'
  },
  statsLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee'
  },
  contentContainer: {
    backgroundColor: 'white'
  },
  containerComment: { flexDirection: 'row', height: 60, borderTopWidth: 0.5, paddingTop: 5, borderTopColor: '#dcdcde' },
  imgComment: { width: 40, height: 40, borderRadius: 25, borderWidth: 2, borderColor: '#fff', marginLeft: 5 },
  textInput: {
    backgroundColor: '#f1f1f2',
    height: 40,
    marginBottom: 15,
    marginHorizontal: 10,
    color: 'black',
    borderRadius: 5,
    flex: 1,
    paddingLeft: 10
  }
});
