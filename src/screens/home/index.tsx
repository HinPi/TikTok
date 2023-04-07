import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import React, { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import { TextField } from '../../components/text-field';
import { WHITE } from '../../styles/color';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { FollowingScreen } from './components/FollowingTab';
import { ForYouScreen } from './components/ForYouTab';

export const HomeScreen = (): JSX.Element => {
  const [index, setIndex] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  const previousIndexRef = useRef(0);
  const [routes] = useState([
    { key: 'first', title: 'Following' },
    { key: 'second', title: 'For you' }
  ]);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'second':
        return <ForYouScreen isActive={index === 1} />;
      case 'first':
        return <FollowingScreen />;
      default:
        return null;
    }
  };

  const LazyPlaceholder = () => <ActivityIndicator style={styles.loading} size={'large'} color={'blue'} />;

  const renderLazyPlaceholder = () => <LazyPlaceholder />;

  return (
    <TabView
      lazy={true}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: WINDOW_WIDTH }}
      renderLazyPlaceholder={renderLazyPlaceholder}
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
  fontStyle: { ...TYPOGRAPHY_STYLES.Body1, fontWeight: 'bold' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }
});
