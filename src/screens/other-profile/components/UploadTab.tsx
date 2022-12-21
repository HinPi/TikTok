import { devGifUri } from '@env';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import React, { memo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TextField } from '../../../components/text-field';
import { PATH } from '../../../constants';
import { useFetch } from '../../../handle-api';
import { TYPOGRAPHY_STYLES } from '../../../styles/typography';

export const PostedTab = memo((props: any): JSX.Element => {
  const { id, name } = props;
  const { response, loading } = useFetch(`${PATH.VIDEO}/${id}`);

  const renderItem = (props: any) => {
    const { item } = props;
    return (
      <View style={{ marginRight: 1, marginVertical: 0.5 }} key={item._id}>
        <FastImage source={{ uri: devGifUri + item?.gifUrl }} style={{ width: WINDOW_WIDTH / 3, height: WINDOW_WIDTH / 3 }} />
      </View>
    );
  };

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'black'} />;
  if (response?.length === 0)
    return (
      <View style={{ marginTop: 50 }}>
        <TextField
          label={'No videos yet'}
          style={{ ...TYPOGRAPHY_STYLES.Body2, fontWeight: 'bold', color: 'black', textAlign: 'center' }}
        />
        <View style={{ marginTop: 10 }}>
          <TextField
            label={`Videos posted by ${name} will apear here`}
            style={{ ...TYPOGRAPHY_STYLES.Body2, color: 'black', textAlign: 'center', opacity: 0.5 }}
          />
        </View>
      </View>
    );
  return <FlatList data={response} renderItem={renderItem} numColumns={3} />;
});

const styles = StyleSheet.create({
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
});
