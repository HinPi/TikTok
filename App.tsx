import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AppRouting } from './src/routing';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppRouting />;
};

export default App;
