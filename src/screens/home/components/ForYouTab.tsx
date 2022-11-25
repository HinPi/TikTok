import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import React, { memo, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { DEFAULT_HEIGHT, PATH } from '../../../constants';
import { useFetch } from '../../../handle-api';
import { Item } from './item';

export const ForYouScreen = memo((): JSX.Element => {
  const { loading, response } = useFetch(PATH.VIDEO);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'blue'} />;
  return (
    <FlatList
      style={{ flex: 1 }}
      data={response}
      pagingEnabled
      renderItem={({ item, index }) => <Item data={item} isActive={activeVideoIndex === index} />}
      onScroll={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - DEFAULT_HEIGHT.TAB_BAR));
        setActiveVideoIndex(index);
      }}
      showsVerticalScrollIndicator={false}
      snapToInterval={WINDOW_HEIGHT - 48}
      snapToAlignment={'end'}
      decelerationRate={'fast'}
      disableIntervalMomentum
      removeClippedSubviews
    />
  );
});

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }
});
