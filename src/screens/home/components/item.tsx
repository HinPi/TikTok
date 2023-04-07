import { devImageUri, devVideoUri } from '@env';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { memo, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Video from 'react-native-video';
import { PATH } from '../../../constants';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '../../../device-info';
import { useStore } from '../../../store';
import { WHITE } from '../../../styles/color';
import { CommentSvg, HeartSvg, MusicSvg, PauseSvg, ShareSvg } from '../../../svg-view';
import { LoginModal } from '../../login';
import { ModalComment } from './comment';

export const Item = memo(({ data, isActive }: any): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const { videoUrl, author, likeCount, commentCount, _id, desc } = data;
  const http = author.avatarLarger.split(':')[0];
  const sheetRef = useRef<BottomSheet>(null);
  const sheetRefLogin = useRef<BottomSheet>(null);
  const ref = useRef<any>();
  const [paused, setPaused] = useState<boolean>(false);
  const [isLike, setIsLike] = useState<boolean>(false);
  const [like, setLike] = useState<number>(Number(likeCount));
  const { postData, isLogged } = useStore();
  const { token } = useStore((store) => store.credentials || {});

  useEffect(() => {
    const blur = navigation.addListener('blur', () => {
      setPaused(true);
    });

    const focus = navigation.addListener('focus', () => {
      setPaused(false);
    });

    return () => {
      navigation.removeListener('blur', blur);
      navigation.removeListener('focus', focus);
    };
  }, [navigation]);

  const handlePausePlay = () => {
    setPaused(!paused);
  };

  const handleNavigate = () => {
    navigation.navigate('OtherProfile', { author: author._id });
  };

  const handleOpenComment = () => {
    sheetRef.current?.collapse();
  };

  const handleLike = () => {
    isLogged === true
      ? (postData(token, `${PATH.VIDEO}/${_id}/like`),
        isActive && setIsLike(!isLike),
        isActive && isLike ? setLike((prev) => prev - 1) : setLike((prev) => prev + 1))
      : sheetRefLogin.current?.collapse();
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={handlePausePlay}>
          <Video
            source={{
              uri: devVideoUri + videoUrl
            }}
            ref={ref}
            style={styles.video}
            resizeMode={'cover'}
            repeat={true}
            paused={!isActive || paused}
            selectedVideoTrack={{
              type: 'resolution',
              value: isActive ? 1080 : 144
            }}
          />
        </TouchableWithoutFeedback>
        {paused && (
          <View style={{ position: 'absolute', bottom: WINDOW_HEIGHT / 2, left: WINDOW_WIDTH / 2 }}>
            <PauseSvg />
          </View>
        )}
        <View style={styles.uiContainer}>
          <View style={styles.rightContainer}>
            <TouchableOpacity onPress={handleNavigate}>
              <View>
                <Image
                  style={styles.profilePicuter}
                  source={{
                    uri: http === 'https' ? author.avatarLarger : devImageUri + author.avatarLarger
                  }}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleLike}>
                <HeartSvg fill={isLike ? '#E44558' : '#FFF'} />
              </TouchableOpacity>
              <Text style={styles.statsLabel}>{like}</Text>
            </View>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={handleOpenComment}>
                <CommentSvg />
              </TouchableOpacity>
              <Text style={styles.statsLabel}>{commentCount}</Text>
              {isActive ? <ModalComment ref={sheetRef} id={_id} /> : null}
              <LoginModal ref={sheetRefLogin} />
            </View>
            <TouchableOpacity>
              <View style={styles.iconContainer}>
                <ShareSvg />
                <Text style={{ color: WHITE }}>Share</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.handle}>{author.nickName}</Text>
              {desc ? <Text style={styles.description}>{desc || ''}</Text> : null}
              <View style={styles.songRow}>
                <MusicSvg />
                <Text numberOfLines={1} style={styles.songName}>
                  Chỉ là quá khứ
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  background: { backgroundColor: 'black', flex: 1 },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  container: {
    width: '100%',
    height: WINDOW_HEIGHT - 48
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end'
  },
  rightContainer: {
    alignSelf: 'flex-end',
    height: 300,
    justifyContent: 'space-between',
    marginRight: 5,
    marginBottom: 30
  },
  bottomContainer: {
    padding: 10
  },
  handle: {
    color: WHITE,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    color: WHITE,
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '300'
  },
  songRow: {
    color: WHITE,
    flexDirection: 'row',
    alignItems: 'center'
  },
  songName: {
    color: WHITE,
    marginLeft: 5,
    fontSize: 16,
    width: '50%'
  },
  profilePicuter: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff'
  },
  iconContainer: {
    alignItems: 'center'
  },
  statsLabel: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700'
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: '#eee'
  }
});
