import { PortalProvider } from '@gorhom/portal';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { AppRouting } from './src/routing';
const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PortalProvider>
      <AppRouting />
    </PortalProvider>
  );
};

export default App;
