import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import React, { memo, useState } from 'react';
import { FlatList } from 'react-native';
import { DEFAULT_HEIGHT, PATH } from '../../../constants';
import { useFetch } from '../../../handle-api';
import { Item } from './item';

export const ForYouScreen = memo((isActives: { isActive: boolean }): JSX.Element => {
  const { loading, response } = useFetch(PATH.VIDEO);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const { isActive } = isActives;

  return (
    <FlatList
      style={{ flex: 1 }}
      data={response}
      renderItem={({ item, index }) => <Item data={item} isActive={activeVideoIndex === index && isActive} />}
      onScroll={(e) => {
        const index = Math.round(e.nativeEvent.contentOffset.y / (WINDOW_HEIGHT - DEFAULT_HEIGHT.TAB_BAR));
        setActiveVideoIndex(index);
      }}
      removeClippedSubviews={true}
      showsVerticalScrollIndicator={false}
      snapToInterval={WINDOW_HEIGHT - 48}
      snapToAlignment={'end'}
      decelerationRate={'fast'}
      disableIntervalMomentum
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={5}
    />
  );
});
