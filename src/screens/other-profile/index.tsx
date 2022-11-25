import { devImageUri } from '@env';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import { TextField } from '../../components/text-field';
import { WHITE } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { TabIsLikeSvg, TabUploadSvg } from '../../svg-view';
import { LikedOtherTab } from './components/LikedTab';
import { PostedTab } from './components/UploadTab';

type Props = NativeStackScreenProps<StackParamList>;

export const OtherProfile = ({ route, navigation }: Props): JSX.Element => {
  const { params } = route;
  const http = params?.author.avatarLarger.split(':')[0];
  const [index, setIndex] = useState(0);
  const [routes] = useState([{ key: 'posted' }, { key: 'liked' }]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: params?.author.nickName,
      headerTitleAlign: 'center'
    });
  }, []);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'posted':
        return <PostedTab id={params?.author._id} />;
      case 'liked':
        return <LikedOtherTab name={params?.author.uniqueId} />;
      default:
        return null;
    }
  };

  const getTabBarIcon = (route: Route, focused: boolean) => {
    switch (route.key) {
      case 'posted':
        return <TabUploadSvg fillOpacity={focused ? 1 : 1.5} />;
      case 'liked':
        return <TabIsLikeSvg fillOpacity={focused ? 1 : 1.5} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{}}>
        <View style={styles.view}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 50,
              borderWidth: 2,
              borderColor: '#fff'
            }}
            source={{
              uri: http === 'https' ? params?.author.avatarLarger : devImageUri + params?.author.avatarLarger
            }}
          />
        </View>
        <View style={[styles.view, { marginTop: 10 }]}>
          <TextField label={`@${params?.author.uniqueId}`} style={[styles.text, { fontWeight: '600' }]} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View style={styles.followContainer}>
            <TextField label={'14'} style={[styles.text, { fontWeight: '700' }]} />
            <TextField label={'Following'} style={[styles.text, { lineHeight: 15.83, fontSize: 13, fontWeight: '400' }]} />
          </View>
          <View style={styles.followContainer}>
            <TextField label={'14'} style={[styles.text, { fontWeight: '700' }]} />
            <TextField label={'Follower'} style={[styles.text, { lineHeight: 15.83, fontSize: 13, fontWeight: '400' }]} />
          </View>
          <View style={styles.followContainer}>
            <TextField label={'14'} style={[styles.text, { fontWeight: '700' }]} />
            <TextField label={'Likes'} style={[styles.text, { lineHeight: 15.83, fontSize: 13, fontWeight: '400' }]} />
          </View>
        </View>
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              backgroundColor: '#fe2c55',
              width: 164,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5
            }}
          >
            <TextField label={'Follow'} style={[styles.text, { fontWeight: '700', color: WHITE }]} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 5 }}>
        <TextField label={'no bio yet'} style={[styles.text, { lineHeight: 15.83, fontSize: 16, fontWeight: '400' }]} />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: WINDOW_WIDTH }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            renderIcon={({ route, focused }) => getTabBarIcon(route, focused)}
            indicatorStyle={styles.indicatorStyle}
            style={styles.backgroundTabBar}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: { ...TYPOGRAPHY_STYLES.Subhead1, fontSize: 17, color: 'black', lineHeight: 20.71 },
  view: { alignItems: 'center', marginTop: 30 },
  followContainer: { flex: 1, alignItems: 'center', marginTop: 20 },
  backgroundTabBar: { backgroundColor: 'transparent', elevation: 0 },
  indicatorStyle: { backgroundColor: 'black', width: 30, height: 2.5, left: (WINDOW_WIDTH / 2 - 30) / 2 }
});
