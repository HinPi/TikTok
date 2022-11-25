import { devGifUri } from '@env';
import { useIsFocused } from '@react-navigation/native';
import React, { memo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PATH } from '../../../constants';
import { WINDOW_WIDTH } from '../../../device-info';
import { useFetch } from '../../../handle-api';

export const LikedTab = memo((): JSX.Element => {
  const isFocused = useIsFocused();
  const { response, loading } = useFetch(PATH.LIKED, isFocused);

  const renderItem = (props: any) => {
    const { item } = props;
    return (
      <View style={{ marginRight: 1, marginVertical: 0.5 }} key={item._id}>
        <FastImage
          source={{ uri: devGifUri + item.videoId?.gifUrl }}
          style={{ width: WINDOW_WIDTH / 3, height: WINDOW_WIDTH / 3 }}
        />
      </View>
    );
  };

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'black'} />;
  return <FlatList data={response} renderItem={renderItem} numColumns={3} />;
});

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
});
