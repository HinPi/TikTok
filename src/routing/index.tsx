import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Fragment, useEffect, useRef } from 'react';
import { NativeModules, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { DEFAULT_HEIGHT, ROUTE_KEYS } from '../constants';
import { getItem } from '../device-info';
import { FriendsScreen } from '../screens/friends';
import { HomeScreen } from '../screens/home';
import { NotificationScreen } from '../screens/notification';
import { ProfileScreen } from '../screens/profile';
import { useStore } from '../store';
import { TYPOGRAPHY_STYLES } from '../styles/typography';
import { DiscoverIconSvg, HomeIconSvg, InboxIconSvg, PersonSvg, RecordVideo } from '../svg-view';
const { VideoEditorModule } = NativeModules;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

async function startIosVideoEditor() {
  return await VideoEditorModule.openVideoEditor();
}

async function startAndroidVideoEditor() {
  return await VideoEditorModule.openVideoEditor();
}

export const AppRouting = () => {
  const theme: Theme = {
    ...DefaultTheme,
    colors: { ...DefaultTheme.colors, background: 'white' }
  };
  const isLogged = useStore((store) => store.isLogged);
  const setCredentials = useStore((store) => store.setCredentials);

  useEffect(() => {
    const prepare = async () => {
      const credentials = await getItem('credentials');
      if (credentials) setCredentials(JSON.parse(credentials));
    };

    prepare();
  }, []);

  return (
    <NavigationContainer theme={theme}>
      <AuthorizedRoutes />
    </NavigationContainer>
  );
};

const Recording = () => {
  return null;
};

const AuthorizedRoutes = () => {
  return (
    <Tab.Navigator
      defaultScreenOptions={{ headerTransparent: true }}
      initialRouteName={ROUTE_KEYS.HOME}
      screenOptions={({ route }) => ({
        ...EmptyHeader,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: { ...TYPOGRAPHY_STYLES.Subhead2, fontSize: 10, marginBottom: 3 },
        tabBarActiveTintColor: 'white',
        tabBarStyle: { height: DEFAULT_HEIGHT.TAB_BAR, borderTopColor: '#8dabf7', backgroundColor: 'black' },
        tabBarButton: TabBarButton.includes(route.name) ? undefined : () => null
      })}
    >
      <Tab.Screen
        name={ROUTE_KEYS.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={HomeIconSvg} />
        }}
      />
      <Tab.Screen
        name={ROUTE_KEYS.FRIENDS}
        component={FriendsScreen}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={DiscoverIconSvg} />
        }}
      />
      <Tab.Screen
        name={ROUTE_KEYS.RECORD_VIDEO}
        component={Recording}
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              style={{ marginTop: 5 }}
              onPress={async () => {
                if (Platform.OS === 'android') {
                  startAndroidVideoEditor()
                    .then((videoUri) => {
                      console.log('Banuba Android Video Editor export video completed successfully. Video uri = ' + videoUri);
                    })
                    .catch((e) => {
                      console.log('Banuba Android Video Editor export video failed = ' + e);
                    });
                } else {
                  startIosVideoEditor()
                    .then((response) => {
                      const exportedVideoUri = response?.videoUri;
                      console.log('Banuba iOS Video Editor export video completed successfully. Video uri = ' + exportedVideoUri);
                    })
                    .catch((e) => {
                      console.log('Banuba iOS Video Editor export video failed = ' + e);
                    });
                }
              }}
            >
              <RecordVideo />
            </TouchableOpacity>
          )
        }}
      />
      <Tab.Screen
        name={ROUTE_KEYS.NOTIFICATION}
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={InboxIconSvg} />
        }}
      />
      <Tab.Screen
        name={ROUTE_KEYS.PERSONAL}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={PersonSvg} />
        }}
      />
    </Tab.Navigator>
  );
};

const TabBarIcon = (props: any) => {
  const { focused, Item } = props;
  const tabRef = useRef<any>(null);

  useEffect(() => {
    if (focused) tabRef.current?.animate({ 0: { scale: 1 }, 0.5: { scale: 1.5 }, 1: { scale: 1 } });
  });

  return (
    <Animatable.View ref={tabRef} style={styles.tabIcon}>
      <Item color={focused ? 'white' : '#4A4A4A'} />
    </Animatable.View>
  );
};

const EmptyHeader = { header: () => <Fragment /> };
const TabBarButton = [ROUTE_KEYS.HOME, ROUTE_KEYS.FRIENDS, ROUTE_KEYS.NOTIFICATION, ROUTE_KEYS.PERSONAL, ROUTE_KEYS.RECORD_VIDEO];

const styles = StyleSheet.create({
  tabIcon: { marginTop: 10 }
});
