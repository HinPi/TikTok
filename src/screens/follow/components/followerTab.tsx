import React, { memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { TextField } from '../../../components/text-field';
import { PATH } from '../../../constants';
import { useFetch } from '../../../handle-api';
import { PersonSvg } from '../../../svg-view';
import { Item } from './ItemFollower';

export const FollowerTab = memo((): JSX.Element => {
  const { response, loading } = useFetch(`${PATH.PROFILE}/follower`);

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'black'} />;
  return response?.length === 0 ? (
    <View style={styles.container}>
      <PersonSvg width={100} height={100} />
      <TextField label="Followers" style={styles.titleStyle} />
      <TextField label="When people follow you, you will see them here" style={styles.contentStyles} />
    </View>
  ) : (
    <FlatList data={response} renderItem={({ item }) => <Item item={item} />} />
  );
});

const styles = StyleSheet.create({
  container: { height: 600, justifyContent: 'center', alignItems: 'center' },
  titleStyle: { fontSize: 16, fontWeight: '700', color: 'black', marginVertical: 5, marginTop: 15 },
  contentStyles: { fontSize: 12, color: 'black', marginVertical: 5 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
});
