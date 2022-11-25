import { devGifUri } from '@env';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import React, { memo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PATH } from '../../../constants';
import { useFetch } from '../../../handle-api';

export const MyVideoTab = memo((): JSX.Element => {
  const { response, loading } = useFetch(`${PATH.VIDEO}/postedvideo`);
  const renderItem = (props: any) => {
    const { item } = props;
    return (
      <View style={{ marginRight: 1, marginVertical: 0.5 }} key={item._id}>
        <FastImage source={{ uri: devGifUri + item?.gifUrl }} style={{ width: WINDOW_WIDTH / 3, height: WINDOW_WIDTH / 3 }} />
      </View>
    );
  };

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'black'} />;
  return <FlatList data={response} renderItem={renderItem} numColumns={3} />;
});

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
});
