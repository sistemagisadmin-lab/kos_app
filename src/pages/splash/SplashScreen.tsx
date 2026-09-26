import React, { useEffect } from 'react';
import { View, Dimensions, StatusBar, Text } from 'react-native';
import { Image } from 'expo-image';

const { width } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish?: () => void;
  duration?: number;
}

export default function CustomSplashScreen({
  onFinish,
  duration = 3000,
}: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onFinish]);

  return (
    <View className="flex-1 bg-white items-center justify-between py-16 px-6">
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Top Spacer for layout balance */}
      <View className="h-10" />

      {/* Center: High Performance Kos Magis Logo */}
      <View className="items-center justify-center">
        <Image
          source={require('../../../assets/logo/logomagis.png')}
          style={{
            width: width * 0.65,
            height: width * 0.65,
            maxWidth: 260,
            maxHeight: 260,
          }}
          contentFit="contain"
          priority="high"
          transition={200}
        />
      </View>

      {/* Bottom: Built by Sistemagis Branding */}
      <View className="items-center pb-4">
        <Text className="text-xs font-semibold text-gray-400 tracking-wider mb-2">
          Built by
        </Text>
        <Image
          source={require('../../../assets/logo/sistemagis.png')}
          style={{
            width: 140,
            height: 38,
          }}
          contentFit="contain"
          priority="high"
        />
      </View>
    </View>
  );
}
