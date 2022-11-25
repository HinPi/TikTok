import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { BackHandler, StyleSheet, ToastAndroid } from 'react-native';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import { TextField } from '../../components/text-field';
import { WHITE } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { FollowingScreen } from './components/FollowingTab';
import { ForYouScreen } from './components/ForYouTab';

export const HomeScreen = (): JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();
  const [backPressCount, setBackPressCount] = useState(0);
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: 'first', title: 'Following' },
    { key: 'second', title: 'For you' }
  ]);

  const handleBackPress = useCallback(() => {
    if (backPressCount === 0) {
      setBackPressCount((prevCount) => prevCount + 1);
      setTimeout(() => setBackPressCount(0), 2000);
      ToastAndroid.show('Press one more time to exit', ToastAndroid.SHORT);
    } else if (backPressCount === 1) {
      BackHandler.exitApp();
    }
    return true;
  }, [backPressCount]);

  useEffect(() => {
    // navigation.addListener('beforeRemove', (e) => {
    //     e.preventDefault()

    // })
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, [handleBackPress]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'second':
        return <ForYouScreen />;
      case 'first':
        return <FollowingScreen />;
      default:
        return null;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: WINDOW_WIDTH }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderLabel={({ route, focused }) => (
            <TextField label={route?.title} style={[styles.fontStyle, focused ? { color: WHITE } : null]} />
          )}
          indicatorStyle={styles.indicatorStyle}
          style={styles.backgroundTabBar}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  indicatorStyle: { backgroundColor: WHITE, width: 30, height: 2.5, left: (WINDOW_WIDTH / 2 - 30) / 2 },
  backgroundTabBar: {
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    elevation: 0
  },
  fontStyle: { ...TYPOGRAPHY_STYLES.Body1, fontWeight: 'bold' }
});
