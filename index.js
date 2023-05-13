/**
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import { register } from '@videosdk.live/react-native-sdk';
import { AppRegistry, Linking } from 'react-native';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import App from './App';
import { name as appName } from './app.json';
import { updateCallStatus } from './src/handle-api/index';
import Incomingvideocall from './src/utils/incoming-video-call';
register();

const firebaseListener = async (remoteMessage) => {
  const { callerInfo, videoSDKInfo, type } = JSON.parse(remoteMessage.data.info);

  if (type === 'CALL_INITIATED') {
    const incomingCallAnswer = ({ callUUID }) => {
      //   Incomingvideocall.backToForeground();
      updateCallStatus({
        callerInfo,
        type: 'ACCEPTED'
      });
      Incomingvideocall.endIncomingcallAnswer(callUUID);
      Linking.openURL(`videocalling://meetingscreen/${videoSDKInfo.token}/${videoSDKInfo.meetingId}`).catch((err) => {
        console.log(err);
      });
    };

    const endIncomingCall = () => {
      Incomingvideocall.endIncomingcallAnswer();
      updateCallStatus({ callerInfo, type: 'REJECTED' });
    };

    Incomingvideocall.configure(incomingCallAnswer, endIncomingCall);
    Incomingvideocall.displayIncomingCall(callerInfo.name);
    Incomingvideocall.backToForeground();
  }
};

// Register background handler
messaging().setBackgroundMessageHandler(firebaseListener);

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
