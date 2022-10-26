import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { DEFAULT_HEIGHT } from '../../constants';
import { WINDOW_HEIGHT } from '../../device-info';
import { Item } from './components/item';

const data = [
  {
    id: 1,
    uri: 'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4'
  },
  {
    id: 2,
    uri: 'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4'
  },
  {
    id: 3,
    uri: 'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4'
  },
  {
    id: 4,
    uri: 'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4'
  }
];

export const HomeScreen = (): JSX.Element => {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  return (
    <FlatList
      data={data}
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
    />
  );
};
