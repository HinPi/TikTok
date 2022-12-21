import { devGifUri } from '@env';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { PATH } from '../../../constants';
import { WINDOW_WIDTH } from '../../../device-info';
import { useFetch } from '../../../handle-api';

export const LikedTab = memo((): JSX.Element => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { response, loading } = useFetch(PATH.LIKED, isFocused);

  const renderItem = (props: any) => {
    const { item } = props;
    return (
      <View style={styles.container} key={item._id}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('FlatList', { paths: PATH.LIKED, index: props.index, isLike: true })}
        >
          <FastImage source={{ uri: devGifUri + item.gifUrl }} style={styles.gifStyle} />
        </TouchableWithoutFeedback>
      </View>
    );
  };

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'black'} />;
  return <FlatList data={response} renderItem={renderItem} numColumns={3} />;
});

const styles = StyleSheet.create({
  container: { marginRight: 1, marginVertical: 0.5 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  gifStyle: { width: WINDOW_WIDTH / 3, height: WINDOW_WIDTH / 3 }
});
