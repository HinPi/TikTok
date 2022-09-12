import React, { Fragment, useEffect, useRef } from 'react';
import { BottomTabBarButtonProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Animatable from 'react-native-animatable';
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { useStore } from '../store';
import { getItem } from '../device-info';
import { StyleSheet, Pressable } from 'react-native';
import { DEFAULT_HEIGHT, ROUTE_KEYS } from '../constants';
import { TYPOGRAPHY_STYLES } from '../styles/typography';
import { DiscoverIconSvg, HomeIconSvg, PersonSvg, StatisticIconSvg } from '../svg-view';
import { HomeScreen } from '../screens/home';
import { FriendsScreen } from '../screens/friends';
import { NotificationScreen } from '../screens/notification';
import { ProfileScreen } from '../screens/profile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

const AuthorizedRoutes = () => {
  const CustomTabButton = (props: BottomTabBarButtonProps) => (
    <Pressable {...props} style={props.accessibilityState?.selected ? [props.style, styles.indicatorStyle] : props.style} />
  );

  return (
    <Tab.Navigator
      defaultScreenOptions={{ headerTransparent: true }}
      initialRouteName={ROUTE_KEYS.DASHBOARD}
      screenOptions={({ route }) => ({
        ...EmptyHeader,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: { ...TYPOGRAPHY_STYLES.Subhead2, fontSize: 11 },
        tabBarActiveTintColor: 'black',
        tabBarStyle: { height: DEFAULT_HEIGHT.TAB_BAR, paddingBottom: 15, borderTopColor: '#8dabf7' },
        tabBarButton: TabBarButton.includes(route.name) ? undefined : () => null
      })}
    >
      <Tab.Screen
        name={ROUTE_KEYS.DASHBOARD}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={HomeIconSvg} />,
          tabBarButton: CustomTabButton
        }}
      />
      <Tab.Screen
        name={ROUTE_KEYS.CHANNELS}
        component={FriendsScreen}
        options={{
          tabBarLabel: 'Friends',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={DiscoverIconSvg} />,
          tabBarButton: CustomTabButton
        }}
      />
      <Tab.Screen
        name={ROUTE_KEYS.COSTS}
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={StatisticIconSvg} />,
          tabBarButton: CustomTabButton
        }}
      />
      <Tab.Screen
        name={ROUTE_KEYS.PERSONAL}
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={PersonSvg} />,
          tabBarButton: CustomTabButton
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
      <Item color={focused ? 'black' : '#4A4A4A'} fill={focused ? 'rgba(92, 136, 209, 0.33)' : 'none'} />
    </Animatable.View>
  );
};

const EmptyHeader = { header: () => <Fragment /> };
const TabBarButton = [ROUTE_KEYS.CHANNELS, ROUTE_KEYS.COSTS, ROUTE_KEYS.DASHBOARD, ROUTE_KEYS.PERSONAL];

const styles = StyleSheet.create({
  tabIcon: { justifyContent: 'center', alignItems: 'center', marginBottom: -15 },
  indicatorStyle: { borderTopWidth: 2, borderTopColor: '#4676F2' }
});
