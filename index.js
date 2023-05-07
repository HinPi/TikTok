/**
 * @format
 */

import { register } from '@videosdk.live/react-native-sdk';
import { AppRegistry } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';

register();
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
