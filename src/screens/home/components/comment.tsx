import { devImageUri } from '@env';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetTextInput,
  TouchableOpacity
} from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { forwardRef, Ref, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Keyboard, StyleSheet, TextInputProps, View } from 'react-native';
import { TextField } from '../../../components/text-field';
import { generateUUID, PATH } from '../../../constants';
import { useFetch } from '../../../handle-api';
import { useStore } from '../../../store';
import { DARK_RED } from '../../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../../styles/typography';
import { ArrowUpSvg } from '../../../svg-view';
import { timeForNotification } from '../../../utils';
import { LoginModal } from '../../login';
export const ModalComment = forwardRef((props: { id?: string }, ref?: Ref<BottomSheet>) => {
  const { isLogged } = useStore();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { id } = props;
  const sheetRef = useRef<BottomSheet>(null);
  const [input, setInput] = useState('');
  const { postData } = useStore();
  const { token, avatar, name } = useStore((store) => store.credentials || {});
  const [data, setData] = useState<any>([]);
  const { response, loading } = useFetch(`${PATH.VIDEO}/${id}/comments`);

  useEffect(() => {
    setData(response);
  }, [response]);

  const handleSubmit = async () => {
    setData([
      {
        _id: generateUUID(24),
        created_at: Date.now(),
        message: input,
        author: { avatarLarger: avatar, nickName: name }
      },
      ...data
    ]);
    setInput('');
    await postData(token, `${PATH.COMMENT}/${id}`, { message: input });
  };
  const snapPoints = useMemo(() => ['65%'], []);

  const commentCount = (length: number) => {
    switch (length) {
      case 0:
        return 'No comments';
      case 1:
        return '1 comment';
      default:
        return length + ' comments';
    }
  };

  const handleNavigate = (id: string) => {
    navigation.navigate('OtherProfile', { author: id });
  };

  // render
  const renderItem = useCallback(
    ({ item }: { item: string }) => (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => handleNavigate(item.author._id)}>
          <Image source={{ uri: item.author.avatarLarger }} style={styles.imgComment} />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <TouchableOpacity onPress={() => handleNavigate(item.author._id)}>
            <TextField label={item.author.nickName} style={[styles.textStyle, { color: '#747474', fontSize: 14 }]} />
          </TouchableOpacity>
          <TextField label={item.message} style={[styles.textStyle]} />
          <TextField
            label={timeForNotification(item.created_at)}
            style={[styles.textStyle, { color: '#747474', fontSize: 14 }]}
          />
        </View>
      </View>
    ),
    []
  );
  return (
    <Portal>
      <BottomSheet
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        snapPoints={snapPoints}
        enablePanDownToClose
        ref={ref}
        index={-1}
        backdropComponent={(props) => (
          <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} onPress={Keyboard.dismiss} />
        )}
      >
        <View style={{ alignItems: 'center' }}>
          <TextField label={commentCount(data?.length)} style={styles.textStyle} />
        </View>

        <BottomSheetFlatList
          data={data}
          keyExtractor={(i) => i._id}
          renderItem={renderItem}
          contentContainerStyle={styles.contentContainer}
        />
        {isLogged ? (
          <View style={styles.containerComment}>
            <Image
              style={styles.imgComment}
              source={{
                uri: avatar
              }}
            />
            <CustomInput
              style={styles.textInput}
              selectionColor={DARK_RED}
              placeholder={'Add comment...'}
              placeholderTextColor={'#a8a8ac'}
              onChangeText={(text) => setInput(text)}
              value={input}
            />
            <TouchableOpacity
              style={{ height: 40, justifyContent: 'center', marginRight: 5 }}
              disabled={!input}
              onPress={handleSubmit}
            >
              <ArrowUpSvg />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => sheetRef.current?.collapse()}>
            <View style={styles.containerComment}>
              <Image
                style={styles.imgComment}
                source={{
                  uri: devImageUri + 'blankBG.png'
                }}
              />
              <BottomSheetTextInput
                editable={false}
                style={styles.textInput}
                selectionColor={DARK_RED}
                placeholder={'Add comment...'}
                placeholderTextColor={'#a8a8ac'}
              />
              <LoginModal ref={sheetRef} />
            </View>
          </TouchableOpacity>
        )}
      </BottomSheet>
    </Portal>
  );
});

const CustomInput = (props: TextInputProps) => {
  const { style, selectionColor, placeholder, placeholderTextColor, onChangeText, value } = props;
  return (
    <BottomSheetTextInput
      style={style}
      selectionColor={selectionColor}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      onChangeText={onChangeText}
      defaultValue={value}
    />
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
    flexDirection: 'row',
    marginLeft: 7,
    marginVertical: 7
  },
  containerComment: { flexDirection: 'row', height: 60, borderTopWidth: 0.5, paddingTop: 5, borderTopColor: '#dcdcde' },
  textInput: {
    backgroundColor: '#f1f1f2',
    height: 40,
    marginBottom: 15,
    marginHorizontal: 10,
    color: 'black',
    borderRadius: 25,
    flex: 1,
    paddingLeft: 10
  },
  imgComment: { width: 40, height: 40, borderRadius: 25, borderWidth: 2, borderColor: '#fff', marginLeft: 5 },
  iconContainer: {
    alignItems: 'center'
  },
  statsLabel: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: -5
  },
  textStyle: { ...TYPOGRAPHY_STYLES.Subhead1, color: 'black' }
});
