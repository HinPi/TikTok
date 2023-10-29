import { devImageUri } from '@env';
import { PortalProvider } from '@gorhom/portal';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer, Theme } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React, { Fragment, useEffect, useRef } from 'react';
import { Image, NativeModules, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import RNCallKeep from 'react-native-callkeep';
import { TextField } from '../components/text-field';
import { DEFAULT_HEIGHT, ROUTE_KEYS } from '../constants';
import { getItem } from '../device-info';
import { SCREEN_NAMES } from '../navigators/screenNames';
import Meeting from '../scenes/meeting';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { ListUserScreen } from '../screens/chat/ListUserScreen';
import { FollowerScreen } from '../screens/follow';
import { FriendsScreen } from '../screens/friends';
import { HomeScreen } from '../screens/home';
import { NotificationScreen } from '../screens/notification';
import { OtherFollowScreen } from '../screens/other-follow';
import { OtherProfile } from '../screens/other-profile';
import { ProfileScreen } from '../screens/profile';
import { EditProfileScreen } from '../screens/profile/EditProfile';
import { FlatListScreen } from '../screens/profile/components/FlatList';
import { InputScreen } from '../screens/profile/components/input';
import { SettingScreen } from '../screens/setting-privacy';
import { UploadScreen } from '../screens/upload';
import { useStore } from '../store';
import { TYPOGRAPHY_STYLES } from '../styles/typography';
import { DiscoverIconSvg, HomeIconSvg, InboxIconSvg, PersonSvg, RecordVideo } from '../svg-view';
const { VideoEditorModule } = NativeModules;

const LICENSE_TOKEN =
  'BB/DkXPzOx1M8X1uY9eRSDRKfl6KoEI4M7W1GH3HmBnIrkvZ5UFkfyXBArfdDPJ+ruILLhDjOrIbQji4RQLoFqZ6zIvTZOOVAcdrM/qGgzdNiv1jLHq12mexlUOOm7mxDBeuccYFsN5AggiYDzhEQAD42AxMTvFOvMP+3tmO8h9yOzUbFjK4AlOFL0jWE703NrxoOfEsvdyOLdrr1S/OMA58flD8EOy8WRrUnnjS/xG/Halpgo3/YpBWtoxZp2Pp2Hs/r+Id2/7WwqUx4N3+g75l5B1UwBsQv73urcNXlx4AeW+3p5opSq9L4TGg0+ZrRBvzffK5uUkZyaDTNmyca7Bxn4Xq9RAcNUtdijPckDB9Z1kGxCTsnEtYif1xEk0tEfAfowi5yzbo7N2XajwXILQu8/PoWp3nRxZ4o59cfcl41AUXiUae07/ufUxnGtPJKFjArbVAGuHmMpNm0QEoxYn3skld5smlyGtEI+M88Eq55ldrV3XreiUyyuUMtVMXCHYJAYd371r/WqrZ3zrEJuHFXR9pLUVBPpdJ';

const ERR_SDK_NOT_INITIALIZED_CODE = 'ERR_VIDEO_EDITOR_NOT_INITIALIZED';
const ERR_SDK_NOT_INITIALIZED_MESSAGE =
  'Banuba Video Editor SDK is not initialized: license token is unknown or incorrect.\nPlease check your license token or contact Banuba';

const ERR_LICENSE_REVOKED_CODE = 'ERR_VIDEO_EDITOR_LICENSE_REVOKED';
const ERR_LICENSE_REVOKED_MESSAGE =
  'License is revoked or expired. Please contact Banuba https://www.banuba.com/faq/kb-tickets/new';

const linking = {
  prefixes: ['videocalling://'],
  config: {
    screens: {
      meetingscreen: {
        path: `meetingscreen/:token/:meetingId`
      }
    }
  }
};

function initVideoEditor() {
  VideoEditorModule.initVideoEditor(LICENSE_TOKEN);
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

async function startIosVideoEditor() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditor();
}

async function startIosVideoEditorPIP() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditorPIP();
}

async function startIosVideoEditorTrimmer() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditorTrimmer();
}

async function startAndroidVideoEditorTrimmer() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditorTrimmer();
}

async function startAndroidVideoEditor() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditor();
}

async function startAndroidVideoEditorPIP() {
  initVideoEditor();
  return await VideoEditorModule.openVideoEditorPIP();
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

  useEffect(() => {
    const options: any = {
      ios: {
        appName: 'VideoSDK'
      },
      android: {
        alertTitle: 'Permissions required',
        alertDescription: 'This application needs to access your phone accounts',
        cancelButton: 'Cancel',
        okButton: 'ok',
        imageName: 'phone_account_icon'
      }
    };
    RNCallKeep.setup(options);
    RNCallKeep.setAvailable(true);
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking} fallback={<Text>Loading...</Text>}>
      <AuthorizedRoutes />
    </NavigationContainer>
  );
};

const Recording = () => {
  return null;
};

const TabBarIcon = (props: any) => {
  const { focused, Item, route } = props;
  const tabRef = useRef<any>(null);

  useEffect(() => {
    if (focused) tabRef.current?.animate({ 0: { scale: 1 }, 0.5: { scale: 1.5 }, 1: { scale: 1 } });
  });

  return (
    <Animatable.View ref={tabRef} style={styles.tabIcon}>
      <Item
        fill={route === 'Home' || route === 'Friends' ? 'white' : 'black'}
        color={route === 'Home' || route === 'Friends' ? 'black' : 'white'}
      />
    </Animatable.View>
  );
};

const NativeStackNavigator = () => {
  return (
    <Tab.Navigator
      defaultScreenOptions={{ headerTransparent: true }}
      initialRouteName={ROUTE_KEYS.HOME}
      screenOptions={({ route }) => ({
        ...EmptyHeader,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarLabelStyle: { ...TYPOGRAPHY_STYLES.Subhead2, fontSize: 10, marginBottom: 3 },
        tabBarActiveTintColor: route.name === 'Home' || route.name === 'Friends' ? 'white' : 'black',
        tabBarStyle: {
          height: DEFAULT_HEIGHT.TAB_BAR,
          borderTopColor: '#8dabf7',
          backgroundColor: route.name === 'Home' || route.name === 'Friends' ? 'black' : 'white'
        },
        tabBarButton: TabBarButton.includes(route.name) ? undefined : () => null
      })}
    >
      <Tab.Screen
        name={ROUTE_KEYS.HOME}
        component={HomeScreen}
        options={({ route }) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={HomeIconSvg} route={route.name} />
        })}
      />
      <Tab.Screen
        name={ROUTE_KEYS.FRIENDS}
        component={FriendsScreen}
        options={({ route }) => ({
          tabBarLabel: 'Friends',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={DiscoverIconSvg} route={route.name} />
        })}
      />
      <Tab.Screen
        name={ROUTE_KEYS.RECORD_VIDEO}
        component={Recording}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <TouchableOpacity
              style={{ marginTop: 5 }}
              onPress={async () => {
                if (Platform.OS === 'android') {
                  startAndroidVideoEditor()
                    .then((videoUri) => navigation.navigate('Upload', { uri: videoUri }))
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
        })}
      />
      <Tab.Screen
        name={ROUTE_KEYS.NOTIFICATION}
        component={NotificationScreen}
        options={({ route }) => ({
          tabBarLabel: 'Inbox',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={InboxIconSvg} route={route.name} />
        })}
      />
      <Tab.Screen
        name={ROUTE_KEYS.PERSONAL}
        component={ProfileScreen}
        options={({ route }) => ({
          unmountOnBlur: true,
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} Item={PersonSvg} route={route.name} />
        })}
      />
    </Tab.Navigator>
  );
};

const HomePage = () => {
  return (
    <PortalProvider>
      <NativeStackNavigator />
    </PortalProvider>
  );
};

const PortalFlatList = ({ route, navigation }: NativeStackScreenProps<StackParamList>) => {
  return (
    <PortalProvider>
      <FlatListScreen route={route} navigation={navigation} />
    </PortalProvider>
  );
};

const PortalEditProfileScreen = ({ route, navigation }: NativeStackScreenProps<StackParamList>) => {
  return (
    <PortalProvider>
      <EditProfileScreen route={route} navigation={navigation} />
    </PortalProvider>
  );
};

const AuthorizedRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={'NativeStack'} component={HomePage} options={{ headerShown: false }} />
      <Stack.Screen name={ROUTE_KEYS.UPLOAD} component={UploadScreen} />
      <Stack.Screen
        name={ROUTE_KEYS.OTHER_PROFILE}
        component={OtherProfile}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      />
      <Stack.Screen
        name={ROUTE_KEYS.SETTING}
        component={SettingScreen}
        options={{ title: 'Settings and privacy', headerTitleAlign: 'center' }}
      />
      <Stack.Screen
        name={ROUTE_KEYS.FOLLOW}
        component={FollowerScreen}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      />
      <Stack.Screen
        name={ROUTE_KEYS.OTHER_FOLLOW}
        component={OtherFollowScreen}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}
      />
      <Stack.Screen
        name={ROUTE_KEYS.FLATLIST}
        component={PortalFlatList}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}
      />
      <Stack.Screen
        name={ROUTE_KEYS.LISTUSER}
        component={ListUserScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'Messages',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name={ROUTE_KEYS.CHAT}
        component={ChatScreen}
        options={({ route }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitle: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 40, height: 40, borderRadius: 50, borderWidth: 2, borderColor: '#fff' }}
                source={{
                  uri:
                    route.params?.avatarLarger.split(':')[0] === 'https'
                      ? route.params?.avatarLarger
                      : devImageUri + route.params?.avatarLarger
                }}
              />
              <TextField
                label={route.params?.nickName}
                style={{ color: 'black', fontSize: 16, fontWeight: 'bold', marginLeft: 10 }}
              />
            </View>
          )
        })}
      />
      <Stack.Screen
        name={ROUTE_KEYS.EDIT}
        component={PortalEditProfileScreen}
        options={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          title: 'Edit profile',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 18, fontWeight: 'bold' }
        }}
      />
      <Stack.Screen
        name={ROUTE_KEYS.INPUT}
        component={InputScreen}
        options={({ route }) => ({
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          headerTitle: () => (
            <TextField label={route.params?.title} style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }} />
          ),
          headerTitleAlign: 'center'
        })}
      />
      <Stack.Screen
        name={SCREEN_NAMES.Meeting}
        component={Meeting}
        options={{ cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const EmptyHeader = { header: () => <Fragment /> };
const TabBarButton = [ROUTE_KEYS.HOME, ROUTE_KEYS.FRIENDS, ROUTE_KEYS.NOTIFICATION, ROUTE_KEYS.PERSONAL, ROUTE_KEYS.RECORD_VIDEO];

const styles = StyleSheet.create({
  tabIcon: { marginTop: 10 }
});
