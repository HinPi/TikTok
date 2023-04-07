import { devImageUri } from '@env';
import BottomSheet, { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import { TextField } from '../../components/text-field';
import { PATH } from '../../constants';
import { WINDOW_HEIGHT } from '../../device-info';
import { useFetch } from '../../handle-api';
import { useStore } from '../../store';
import { WHITE } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { HugHeartSvg, LockSvg, MenuSvg, TabIsLikeSvg, TabUploadSvg } from '../../svg-view';
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
  const [status, setStatus] = useState(false);
  const { response, loading } = useFetch(PATH.PROFILE);
  const { avatar, bio, name, userName, id } = useStore((store) => store.credentials || {});

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

  const handleEvent = () => {
    setStatus(!status);
  };

  const handleNavigate = (screen: string, params?: any) => {
    navigation.navigate(screen, params);
  };

  if (loading) return <ActivityIndicator style={styles.loading} size={'large'} color={'black'} />;
  return (
    <View style={styles.container}>
      <Modal animationType="none" transparent={true} visible={status} onRequestClose={handleEvent}>
        <TouchableOpacity style={styles.modalContainer} activeOpacity={1} onPressOut={handleEvent}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <HugHeartSvg />
              <TextField label="Total likes" style={styles.titleStyle} />
              <TextField
                label={`${userName} received a total of ${response?.totalLikes} likes across all videos`}
                style={styles.contentStyles}
              />
              <View
                style={{
                  width: WINDOW_WIDTH - 50,
                  marginTop: 15,
                  paddingVertical: 15,
                  borderTopWidth: 0.5,
                  borderColor: 'rgba(158, 150, 150, .5)'
                }}
              >
                <TouchableOpacity onPress={handleEvent}>
                  <TextField label="OK" style={{ fontSize: 16, fontWeight: '700', color: 'black', textAlign: 'center' }} />
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
      <View style={styles.headerContainer}>
        <TextField label={name} style={[styles.text, styles.textHeader]} />
        <View style={styles.menuIcon}>
          <TouchableOpacity
            onPress={() => handleNavigate('Setting', { provider: response?.profile.provider, uniqueId: userName })}
          >
            <MenuSvg />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={styles.view}>
          <Image
            style={styles.avatar}
            source={{
              uri: avatar?.split(':')[0] === 'https' ? avatar : devImageUri + avatar
            }}
          />
        </View>
        <View style={[styles.view, styles.uniqueLabel]}>
          <TextField label={`@${userName}`} style={[styles.text, styles.uniqueText]} />
        </View>
        <View style={styles.followItem}>
          <View style={styles.followContainer}>
            <TouchableOpacity onPress={() => handleNavigate('Follow', { name: 'following' })} style={{ alignItems: 'center' }}>
              <TextField label={response?.following} style={[styles.text, styles.followNumber]} />
              <TextField label={'Following'} style={[styles.text, styles.followText]} />
            </TouchableOpacity>
          </View>
          <View style={styles.followContainer}>
            <TouchableOpacity onPress={() => handleNavigate('Follow', { name: 'follower' })} style={{ alignItems: 'center' }}>
              <TextField label={response?.follower} style={[styles.text, styles.followNumber]} />
              <TextField label={'Follower'} style={[styles.text, styles.followText]} />
            </TouchableOpacity>
          </View>
          <View style={styles.followContainer}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleEvent}>
              <TextField label={response?.totalLikes} style={[styles.text, styles.followNumber]} />
              <TextField label={'Likes'} style={[styles.text, styles.followText]} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.editLabel}>
          <TouchableOpacity style={styles.editBtn} onPress={() => handleNavigate('edit', { author: response.profile })}>
            <TextField label={'Edit profile'} style={[styles.text, styles.editText]} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bioLabel}>
        <TextField label={bio || 'no bio yet'} style={[styles.text, styles.bioText]} />
      </View>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: WINDOW_WIDTH }}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            pressColor={'transparent'}
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
      <View style={styles.headerContainer}>
        <TextField label={'Profile'} style={[styles.text, styles.textHeader]} />
      </View>
      <View>
        <View style={styles.view}>
          <Image
            style={styles.avatar}
            source={{
              uri: devImageUri + 'blankBG.png'
            }}
          />
        </View>
        <View style={[styles.view, styles.uniqueLabel]}>
          <TextField label={'@username'} style={[styles.text, styles.uniqueText]} />
        </View>
        <View style={styles.followItem}>
          <View style={styles.followContainer}>
            <TextField label={'0'} style={[styles.text, styles.followNumber]} />
            <TextField label={'Following'} style={[styles.text, styles.followText]} />
          </View>
          <View style={styles.followContainer}>
            <TextField label={'0'} style={[styles.text, styles.followNumber]} />
            <TextField label={'Follower'} style={[styles.text, styles.followText]} />
          </View>
          <View style={styles.followContainer}>
            <TextField label={'0'} style={[styles.text, styles.followNumber]} />
            <TextField label={'Likes'} style={[styles.text, styles.followText]} />
          </View>
        </View>
        <View style={styles.loginBtn}>
          <TouchableOpacity style={styles.loginLabel} onPress={() => sheetRef.current?.collapse()}>
            <TextField label={'Log in or sign up'} style={[styles.text, styles.loginText]} />
          </TouchableOpacity>
        </View>
      </View>
      <LoginModal ref={sheetRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    borderBottomWidth: 1,
    borderColor: 'rgba(158, 150, 150, .5)',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    elevation: 1
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff'
  },
  modalContainer: { height: WINDOW_HEIGHT, width: WINDOW_WIDTH, backgroundColor: '#3333334D', justifyContent: 'center' },
  modalView: {
    backgroundColor: WHITE,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 25,
    paddingTop: 15
  },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  titleStyle: { fontSize: 16, fontWeight: '700', color: 'black', marginVertical: 5, marginTop: 25, marginBottom: 10 },
  contentStyles: {
    fontSize: 14,
    color: 'black',
    marginVertical: 5,
    flexWrap: 'wrap',
    textAlign: 'center',
    paddingHorizontal: 15
  },
  textHeader: { fontWeight: '700' },
  uniqueLabel: { marginTop: 10 },
  uniqueText: { fontWeight: '600' },
  menuIcon: { position: 'absolute', right: 15 },
  followNumber: { fontWeight: '700' },
  followItem: { flexDirection: 'row', justifyContent: 'space-evenly' },
  followText: { lineHeight: 15.83, fontSize: 13, fontWeight: '400' },
  text: { ...TYPOGRAPHY_STYLES.Subhead1, fontSize: 17, color: 'black', lineHeight: 20.71 },
  view: { alignItems: 'center', marginTop: 30 },
  followContainer: { flex: 1, alignItems: 'center', marginTop: 20 },
  backgroundTabBar: { backgroundColor: 'transparent', elevation: 0 },
  indicatorStyle: { backgroundColor: 'black', width: 30, height: 2.5, left: (WINDOW_WIDTH / 3 - 30) / 2 },
  editLabel: { marginTop: 20, alignItems: 'center' },
  editBtn: {
    width: 164,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5
  },
  editText: { fontSize: 15, lineHeight: 18.27, fontWeight: '600' },
  bioLabel: { alignItems: 'center', marginTop: 20, marginBottom: 5 },
  bioText: { lineHeight: 15.83, fontSize: 16, fontWeight: '400' },
  loginBtn: { alignItems: 'center', marginTop: 50 },
  loginText: { fontWeight: '700', color: WHITE },
  loginLabel: {
    backgroundColor: '#fe2c55',
    width: 200,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
