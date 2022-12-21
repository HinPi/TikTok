import BottomSheet from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { forwardRef, Ref, useEffect, useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { AccessToken, GraphRequest, GraphRequestManager, LoginManager } from 'react-native-fbsdk-next';
import { TextField } from '../../components/text-field';
import { useStore } from '../../store';
import { TYPOGRAPHY_STYLES } from '../../styles/typography';

export const LoginModal = forwardRef((props, ref?: Ref<BottomSheet>): JSX.Element => {
  const { login, isLogged } = useStore();
  const snapPoints = useMemo(() => ['100%'], []);
  useEffect(() => {
    configureGoogleSign();
  }, []);

  const configureGoogleSign = () => {
    GoogleSignin.configure({
      webClientId: '524899367926-nrfben1eq9ff6dhe0v6odsv1glkgpn4a.apps.googleusercontent.com',
      offlineAccess: false
    });
  };

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      login({
        userID: userInfo.user.id,
        name: userInfo.user.name!,
        imgURL: userInfo.user.photo!,
        provider: 'Google'
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Portal>
      <BottomSheet snapPoints={snapPoints} enablePanDownToClose ref={ref} index={-1}>
        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
          <View style={{ alignItems: 'center', marginHorizontal: 10, marginVertical: 20 }}>
            <TextField
              label={'Sign up for TikTok'}
              style={{ ...TYPOGRAPHY_STYLES.Headline6, fontWeight: 'bold', color: 'black' }}
            />
            <View style={{ marginVertical: 10 }}>
              <TextField
                label={'Create a profile, follow other accounts, make your own videos, and more.'}
                style={{ color: 'black', textAlign: 'center', opacity: 0.5 }}
              />
            </View>
          </View>
          <TouchableOpacity onPress={signIn} style={styles.btnStyle}>
            <Image source={require('../../assets/google.png')} style={{ width: 30, height: 30, marginLeft: 15 }} />
            <View style={{ alignItems: 'center', flex: 1 }}>
              <TextField label={'Continue with Google'} style={styles.btnText} />
            </View>
          </TouchableOpacity>
          <FacebookSigninButton />
        </View>
      </BottomSheet>
    </Portal>
  );
});

const FacebookSigninButton = () => {
  const { login } = useStore();
  const handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data?.accessToken;

            const responseInfoCallback = (error: any, result: any) => {
              if (error) {
                console.log(error);
              } else {
                login({
                  userID: result.id,
                  name: result.name,
                  imgURL: result.picture.data.url,
                  provider: 'Facebook'
                });
              }
            };

            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name,picture.type(large)'
                  }
                }
              },
              responseInfoCallback
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      }
    );
  };
  return (
    <TouchableOpacity onPress={handleFacebookLogin} style={[styles.btnStyle, { marginTop: 15 }]}>
      <Image source={require('../../assets/facebook.png')} style={{ width: 30, height: 30, marginLeft: 15 }} />
      <View style={{ alignItems: 'center', flex: 1 }}>
        <TextField label={'Continue with Facebook'} style={styles.btnText} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    width: '85%',
    borderWidth: 0.5,
    borderColor: 'rgba(158, 150, 150, .5)',
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  btnText: { ...TYPOGRAPHY_STYLES.Body1, fontWeight: '700', color: 'black' }
});
