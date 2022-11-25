import { devImageUri } from '@env';
import BottomSheet, { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import { TextField } from '../../components/text-field';
import { PATH } from '../../constants';
import { useFetch } from '../../handle-api';
import { useStore } from '../../store';
import { WHITE } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { LockSvg, MenuSvg, TabIsLikeSvg, TabUploadSvg } from '../../svg-view';
import { LoginModal } from '../login';
import { LikedTab } from './components/LikedTab';
import { MyVideoTab } from './components/MyVideo';
import { UploadTab } from './components/UploadTab';

export const ProfileScreen = (): JSX.Element => {
  const { isLogged } = useStore();
  return isLogged ? <AuthorizedRoutes /> : <UnauthorizedRoutes />;
};

const AuthorizedRoutes = () => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [index, setIndex] = useState(0);
  const [routes] = useState([{ key: 'upload' }, { key: 'myvideo' }, { key: 'liked' }]);

  const { response, loading } = useFetch(PATH.PROFILE);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'upload':
        return <UploadTab />;
      case 'myvideo':
        return <MyVideoTab />;
      case 'liked':
        return <LikedTab />;
      default:
        return null;
    }
  };

  const getTabBarIcon = (route: Route, focused: boolean) => {
    switch (route.key) {
      case 'upload':
        return <TabUploadSvg fillOpacity={focused ? 1 : 1.5} />;
      case 'myvideo':
        return <LockSvg strokeOpacity={focused ? 1 : 1.5} />;
      case 'liked':
        return <TabIsLikeSvg fillOpacity={focused ? 1 : 1.5} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 1,
          borderColor: 'rgba(158, 150, 150, .5)',
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
          height: 50,
          elevation: 1
        }}
      >
        <TextField label={response?.nickName} style={[styles.text, { fontWeight: '700' }]} />
        <View style={{ position: 'absolute', right: 15 }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Setting', { provider: response?.provider, uniqueId: response?.uniqueId })}
          >
            <MenuSvg />
          </TouchableOpacity>
        </View>
      </View>
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
              uri: response?.avatarLarger
            }}
          />
        </View>
        <View style={[styles.view, { marginTop: 10 }]}>
          <TextField label={`@${response?.uniqueId}`} style={[styles.text, { fontWeight: '600' }]} />
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
              width: 164,
              height: 44,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 0.5,
              borderRadius: 5
            }}
          >
            <TextField label={'Edit profile'} style={[styles.text, { fontSize: 15, lineHeight: 18.27, fontWeight: '600' }]} />
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

const UnauthorizedRoutes = () => {
  const sheetRef = useRef<BottomSheet>(null);
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 20,
          paddingBottom: 15
        }}
      >
        <TextField label={'Profile'} style={[styles.text, { fontWeight: '700' }]} />
      </View>
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
              uri: devImageUri + 'blankBG.png'
            }}
          />
        </View>
        <View style={[styles.view, { marginTop: 10 }]}>
          <TextField label={'@username'} style={[styles.text, { fontWeight: '600' }]} />
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View style={styles.followContainer}>
            <TextField label={'0'} style={[styles.text, { fontWeight: '700' }]} />
            <TextField label={'Following'} style={[styles.text, { lineHeight: 15.83, fontSize: 13, fontWeight: '400' }]} />
          </View>
          <View style={styles.followContainer}>
            <TextField label={'0'} style={[styles.text, { fontWeight: '700' }]} />
            <TextField label={'Follower'} style={[styles.text, { lineHeight: 15.83, fontSize: 13, fontWeight: '400' }]} />
          </View>
          <View style={styles.followContainer}>
            <TextField label={'0'} style={[styles.text, { fontWeight: '700' }]} />
            <TextField label={'Likes'} style={[styles.text, { lineHeight: 15.83, fontSize: 13, fontWeight: '400' }]} />
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 50
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: '#fe2c55',
              width: 200,
              height: 54,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5
            }}
            onPress={() => sheetRef.current?.collapse()}
          >
            <TextField label={'Log in or sign up'} style={[styles.text, { fontWeight: '700', color: WHITE }]} />
          </TouchableOpacity>
        </View>
      </View>
      <LoginModal ref={sheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  text: { ...TYPOGRAPHY_STYLES.Subhead1, fontSize: 17, color: 'black', lineHeight: 20.71 },
  view: { alignItems: 'center', marginTop: 30 },
  followContainer: { flex: 1, alignItems: 'center', marginTop: 20 },
  backgroundTabBar: { backgroundColor: 'transparent', elevation: 0 },
  indicatorStyle: { backgroundColor: 'black', width: 30, height: 2.5, left: (WINDOW_WIDTH / 3 - 30) / 2 }
});
