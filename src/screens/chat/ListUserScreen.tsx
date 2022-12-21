import React from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { TextField } from '../../components/text-field';
import { PATH } from '../../constants';
import { useFetch } from '../../handle-api';
import { PersonSvg } from '../../svg-view';
import { Item } from './components/item';
export const ListUserScreen = (): JSX.Element => {
  //   const { id } = useStore((store) => store.credentials || {});

  //   useEffect(() => {
  //     const socket = io(socketUrl);
  //     socket.emit('user_connect', id);
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);

  const { loading, response } = useFetch(PATH.LISTUSER);

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'black'} />;
  return response?.length === 0 ? (
    <View style={styles.container}>
      <PersonSvg width={100} height={100} />
      <TextField label="Your friends will display here" style={styles.contentStyles} />
    </View>
  ) : (
    <FlatList data={response} renderItem={({ item }) => <Item item={item} />} />
  );
};

const styles = StyleSheet.create({
  container: { height: 600, justifyContent: 'center', alignItems: 'center' },
  titleStyle: { fontSize: 16, fontWeight: '700', color: 'black', marginVertical: 5, marginTop: 15 },
  contentStyles: { fontSize: 12, color: 'black', marginVertical: 5 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }
});
