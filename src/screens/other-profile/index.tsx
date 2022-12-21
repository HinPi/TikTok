import { devImageUri } from '@env';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import { TextField } from '../../components/text-field';
import { PATH } from '../../constants';
import { WINDOW_HEIGHT } from '../../device-info';
import { useFetch } from '../../handle-api';
import { useStore } from '../../store';
import { WHITE } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { HugHeartSvg, TabIsLikeSvg, TabUploadSvg, UnfollowSvg } from '../../svg-view';
import { LikedOtherTab } from './components/LikedTab';
import { PostedTab } from './components/UploadTab';

type Props = NativeStackScreenProps<StackParamList>;

export const OtherProfile = ({ route, navigation }: Props): JSX.Element => {
  const { isLogged, postData } = useStore();
  const { token } = useStore((store) => store.credentials || {});
  return isLogged ? (
    <AuthorizedRoutes route={route} navigation={navigation} />
  ) : (
    <UnauthorizedRoutes route={route} navigation={navigation} />
  );
};

const AuthorizedRoutes = ({ route, navigation }: Props): JSX.Element => {
  const { params } = route;
  const { postData } = useStore();
  const { token } = useStore((store) => store.credentials || {});
  const { response, loading } = useFetch(`${PATH.PROFILE}/auth/${params?.author}`);
  const http = response?.profile.avatarLarger.split(':')[0];
  const [index, setIndex] = useState(0);
  const [routes] = useState([{ key: 'posted' }, { key: 'liked' }]);
  const [status, setStatus] = useState(false);
  const [isFolow, setIsFollow] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: response?.profile.nickName,
      headerTitleAlign: 'center'
    });
    setIsFollow(response?.isFollowed);
  }, [response]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'posted':
        return <PostedTab id={params?.author} name={response?.profile.uniqueId} />;
      case 'liked':
        return <LikedOtherTab name={response?.profile.uniqueId} />;
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

  const handleNavigate = (params?: any) => {
    navigation.navigate('OtherFollow', params);
  };

  const handleEvent = () => {
    setStatus(!status);
  };

  const handleFollow = async () => {
    await postData(token, `${PATH.PROFILE}/${params?.author}`);
    setIsFollow(!isFolow);
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
                label={`${response?.profile.uniqueId} received a total of ${response?.totalLikes} likes across all videos`}
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
      <View>
        <View style={styles.view}>
          <Image
            style={styles.avatar}
            source={{
              uri: http === 'https' ? response?.profile.avatarLarger : devImageUri + response?.profile.avatarLarger
            }}
          />
        </View>
        <View style={[styles.view, styles.uniqueLabel]}>
          <TextField label={`@${response?.profile.uniqueId}`} style={[styles.text, styles.uniqueText]} />
        </View>
        <View style={styles.followItem}>
          <View style={styles.followContainer}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => handleNavigate({ author: response.profile, name: 'following' })}
            >
              <TextField label={response?.following} style={[styles.text, styles.followNumber]} />
              <TextField label={'Following'} style={[styles.text, styles.followText]} />
            </TouchableOpacity>
          </View>
          <View style={styles.followContainer}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => handleNavigate({ author: response.profile, name: 'follower' })}
            >
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
        {isFolow ? (
          <View style={styles.followedLabel}>
            <TouchableOpacity style={styles.followedBtn}>
              <TextField label={'Message'} style={[styles.text, styles.followedText]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.unFollowBtn} onPress={handleFollow}>
              <UnfollowSvg />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.followBtn}>
            <TouchableOpacity style={styles.followLabel} onPress={handleFollow}>
              <TextField label={'Follow'} style={[styles.text, styles.followBtnText]} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.bioContainer}>
        <TextField label={'no bio yet'} style={[styles.text, styles.bioText]} />
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

const UnauthorizedRoutes = ({ navigation, route }: Props): JSX.Element => {
  const { params } = route;
  const { response, loading } = useFetch(`/${PATH.PROFILE}/${params?.author}`);
  const http = response?.profile.avatarLarger.split(':')[0];
  const [index, setIndex] = useState(0);
  const [routes] = useState([{ key: 'posted' }, { key: 'liked' }]);
  const [status, setStatus] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: response?.profile.nickName,
      headerTitleAlign: 'center'
    });
  }, [response]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'posted':
        return <PostedTab id={params?.author} />;
      case 'liked':
        return <LikedOtherTab name={response?.profile.uniqueId} />;
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

  const handleNavigate = (params?: any) => {
    navigation.navigate('OtherFollow', params);
  };

  const handleEvent = () => {
    setStatus(!status);
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
                label={`${response?.profile.uniqueId} received a total of ${response?.totalLikes} likes across all videos`}
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
      <View>
        <View style={styles.view}>
          <Image
            style={styles.avatar}
            source={{
              uri: http === 'https' ? response?.profile.avatarLarger : devImageUri + response?.profile.avatarLarger
            }}
          />
        </View>
        <View style={[styles.view, styles.uniqueLabel]}>
          <TextField label={`@${response?.profile.uniqueId}`} style={[styles.text, styles.uniqueText]} />
        </View>
        <View style={styles.followItem}>
          <View style={styles.followContainer}>
            <TextField label={response?.following} style={[styles.text, styles.followNumber]} />
            <TextField label={'Following'} style={[styles.text, styles.followText]} />
          </View>
          <View style={styles.followContainer}>
            <TextField label={response?.follower} style={[styles.text, styles.followNumber]} />
            <TextField label={'Follower'} style={[styles.text, styles.followText]} />
          </View>
          <View style={styles.followContainer}>
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleEvent}>
              <TextField label={response?.totalLikes} style={[styles.text, styles.followNumber]} />
              <TextField label={'Likes'} style={[styles.text, styles.followText]} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.followBtn}>
          <TouchableOpacity style={styles.followLabel}>
            <TextField label={'Follow'} style={[styles.text, styles.followBtnText]} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bioContainer}>
        <TextField label={'no bio yet'} style={[styles.text, styles.bioText]} />
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
  container: { flex: 1 },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff'
  },
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
  uniqueLabel: { marginTop: 10 },
  uniqueText: { fontWeight: '600' },
  followNumber: { fontWeight: '700' },
  followItem: { flexDirection: 'row', justifyContent: 'space-evenly' },
  followText: { lineHeight: 15.83, fontSize: 13, fontWeight: '400' },
  followBtn: { alignItems: 'center', marginTop: 20 },
  followLabel: {
    backgroundColor: '#fe2c55',
    width: 200,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  modalContainer: { height: WINDOW_HEIGHT, width: WINDOW_WIDTH, backgroundColor: '#3333334D', justifyContent: 'center' },
  followBtnText: { fontWeight: '700', color: WHITE },
  bioContainer: { alignItems: 'center', marginTop: 20, marginBottom: 5 },
  text: { ...TYPOGRAPHY_STYLES.Subhead1, fontSize: 17, color: 'black', lineHeight: 20.71 },
  view: { alignItems: 'center', marginTop: 20 },
  followContainer: { flex: 1, alignItems: 'center', marginTop: 15 },
  backgroundTabBar: { backgroundColor: 'transparent', elevation: 0 },
  indicatorStyle: { backgroundColor: 'black', width: 30, height: 2.5, left: (WINDOW_WIDTH / 2 - 30) / 2 },
  bioText: { lineHeight: 15.83, fontSize: 16, fontWeight: '400' },
  followedLabel: { flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'center' },
  followedBtn: {
    width: 150,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5
  },
  unFollowBtn: {
    width: 50,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    marginLeft: 2
  },
  followedText: { fontSize: 15, lineHeight: 18.27, fontWeight: '600' }
});
