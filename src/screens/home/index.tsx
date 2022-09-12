import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';

export const HomeScreen = () => {
  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <Video
          source={{
            uri: 'https://d8vywknz0hvjw.cloudfront.net/fitenium-media-prod/videos/45fee890-a74f-11ea-8725-311975ea9616/proccessed_720.mp4'
          }}
          style={styles.video}
          resizeMode={'cover'}
          repeat={true}
        />
        <View style={styles.uiContainer}>
          <View style={styles.rightContainer}>
            <View>
              <Image
                style={styles.profilePicuter}
                source={{
                  uri: 'https://scontent.fsgn5-13.fna.fbcdn.net/v/t39.30808-6/271944201_3152722211664631_8159158506795822795_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=WRKP_ayqoGcAX8GrkGx&tn=1WNY2JBTpyyy_dJG&_nc_ht=scontent.fsgn5-13.fna&oh=00_AT9qDI5j7-N3qNpLsShjUzAAafTOxO9TnBOY5_90mrpiGQ&oe=6324FCF4'
                }}
              />
            </View>
            <View style={styles.iconContainer}>
              <Ionicons name={'heart-outline'} size={35} />
              <Text style={styles.statsLabel}>10</Text>
            </View>
            <View style={styles.iconContainer}>
              <FontAwesome name={'commenting-o'} size={35} />
              <Text style={styles.statsLabel}>10</Text>
            </View>
            <View style={styles.iconContainer}>
              <Fontisto name={'share-a'} size={35} />
              <Text style={styles.statsLabel}>10</Text>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View>
              <Text style={styles.handle}>@ThuxBao</Text>
              <Text style={styles.description}>Ghi vô</Text>
              <View style={styles.songRow}>
                <Entypo name={'beamed-note'} size={24} />
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
};

const styles = StyleSheet.create({
  background: { backgroundColor: 'black' },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  container: {
    width: '100%'
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
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '700'
  },
  description: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: '300'
  },
  songRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  songName: {
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
    fontSize: 16,
    fontWeight: '700',
    marginTop: 5
  }
});
