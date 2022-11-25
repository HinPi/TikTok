import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import React, { memo, useState } from 'react';
import { FlatList } from 'react-native';
import { DEFAULT_HEIGHT } from '../../../constants';
import { Item } from './item';

export const FollowingScreen = memo((): JSX.Element => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  return (
    <FlatList
      style={{ flex: 1 }}
      data={[]}
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
