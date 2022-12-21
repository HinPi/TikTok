import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Route, TabBar, TabView } from 'react-native-tab-view';
import { TextField } from '../../components/text-field';
import { WINDOW_WIDTH } from '../../device-info';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';
import { OtherFollowerTab } from './components/OtherFollowerTab';
import { OtherFollowingTab } from './components/OtherFollowingTab';
type Props = NativeStackScreenProps<StackParamList>;
export const OtherFollowScreen = ({ route, navigation }: Props): JSX.Element => {
  const { params } = route;

  const [index, setIndex] = useState(params?.name === 'following' ? 0 : 1);
  const [routes] = useState([{ key: 'following' }, { key: 'follower' }]);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: params?.author.nickName,
      headerTitleAlign: 'center'
    });
  }, []);

  const renderScene = ({ route }: { route: Route }) => {
    switch (route.key) {
      case 'following':
        return <OtherFollowingTab id={params?.author._id} />;
      case 'follower':
        return <OtherFollowerTab id={params?.author._id} />;
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
          renderLabel={({ route }) => <TextField label={route?.key} style={styles.fontStyle} />}
          indicatorStyle={styles.indicatorStyle}
          style={styles.backgroundTabBar}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  fontStyle: { ...TYPOGRAPHY_STYLES.Body1, fontWeight: '700', color: 'black', fontSize: 18 },
  backgroundTabBar: { backgroundColor: 'transparent', elevation: 0 },
  indicatorStyle: { backgroundColor: 'black', width: 30, height: 2.5, left: (WINDOW_WIDTH / 2 - 30) / 2 }
});
