import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import { TextField } from '../../components/text-field';
import { WINDOW_WIDTH } from '../../device-info';
import { useStore } from '../../store';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { FollowerTab } from './components/followerTab';
import { FollowingTab } from './components/followingTab';
type Props = NativeStackScreenProps<StackParamList>;
export const FollowerScreen = ({ route, navigation }: Props): JSX.Element => {
  const { params } = route;
  const [index, setIndex] = useState(params?.name === 'following' ? 0 : 1);
  const [routes] = useState([{ key: 'following' }, { key: 'follower' }]);
  const { name } = useStore((store) => store.credentials || {});
  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerTitleAlign: 'center'
    });
  }, []);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'following':
        return <FollowingTab />;
      case 'follower':
        return <FollowerTab />;
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
      lazy
      renderTabBar={(props) => (
        <TabBar
          {...props}
          pressColor={'transparent'}
          renderLabel={({ route, focused }) =>
            focused ? (
              <TextField label={route?.key} style={styles.fontStyle} />
            ) : (
              <TextField label={route?.key} style={[styles.fontStyle, { opacity: 0.5 }]} />
            )
          }
          indicatorStyle={styles.indicatorStyle}
          style={styles.backgroundTabBar}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  fontStyle: { ...TYPOGRAPHY_STYLES.Body1, color: 'black', fontWeight: '700', fontSize: 18 },
  backgroundTabBar: { backgroundColor: 'transparent', elevation: 0 },
  indicatorStyle: { backgroundColor: 'black', width: 30, height: 2.5, left: (WINDOW_WIDTH / 2 - 30) / 2 }
});
