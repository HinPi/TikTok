import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { memo, useLayoutEffect, useRef, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { DEFAULT_HEIGHT } from '../../../constants';
import { useFetch } from '../../../handle-api';
import { WHITE } from '../../../styles/color';
import { ArrowBackSvg } from '../../../svg-view';
import { FlatListItem } from './item';

type Props = NativeStackScreenProps<StackParamList>;

export const FlatListScreen = memo(({ route, navigation }: Props): JSX.Element => {
  const { params } = route;
  const { loading, response } = useFetch(params?.paths as string);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const ref = useRef<FlatList>(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <View style={{ marginLeft: 10 }}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <ArrowBackSvg color={WHITE} />
          </TouchableWithoutFeedback>
        </View>
      ),
      headerTransparent: true,
      headerTitle: ''
    });
  }, []);

  const getItemLayout = (data: any, index: number) => ({
    length: WINDOW_HEIGHT,
    offset: WINDOW_HEIGHT * index,
    index
  });

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'black'} />;
  return (
    <FlatList
      ref={ref}
      data={response}
      initialScrollIndex={params?.index as number}
      renderItem={({ item, index }) => <FlatListItem data={item} isActive={activeVideoIndex === index} isLike={params?.isLike} />}
      onScroll={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - DEFAULT_HEIGHT.TAB_BAR));
        setActiveVideoIndex(index);
      }}
      showsVerticalScrollIndicator={false}
      snapToInterval={WINDOW_HEIGHT}
      snapToAlignment={'end'}
      decelerationRate={'fast'}
      disableIntervalMomentum
      getItemLayout={getItemLayout}
      removeClippedSubviews={true}
      initialNumToRender={2}
      maxToRenderPerBatch={1}
      windowSize={5}
    />
  );
});

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  container: { flex: 1 }
});
