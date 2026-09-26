import { useEffect } from 'react';
import '../global.css';
import * as SplashScreen from 'expo-splash-screen';
import { Slot } from 'expo-router';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return <Slot />;
}
