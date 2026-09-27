import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { ArrowRight } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  onGetStarted?: () => void;
  imageSource?: ImageSourcePropType;
}

export default function WelcomeScreen({
  onGetStarted,
  imageSource,
}: WelcomeScreenProps) {
  const heroImage = imageSource || require('../../../assets/logo/logomagis.png');

  return (
    <View className="flex-1 bg-white">
      {/* Top Half: Hero Illustration Banner with Soft Curved Bottom */}
      <View
        style={{ height: height * 0.52 }}
        className="w-full bg-[#EFF6FF] items-center justify-center relative overflow-hidden"
      >
        {/* Soft Background Accent Circles */}
        <View className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-[#5194EA15]" />
        <View className="absolute bottom-10 -left-10 w-48 h-48 rounded-full bg-[#5194EA10]" />

        {/* Hero Image Container Slot */}
        <View className="items-center justify-center px-6">
          <Image
            source={heroImage}
            style={{
              width: width * 0.7,
              height: height * 0.32,
            }}
            contentFit="contain"
            priority="high"
          />
        </View>

        {/* Curved Organic Bottom Sheet Divider */}
        <View
          style={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            right: 0,
            height: 36,
            backgroundColor: '#FFFFFF',
            borderTopLeftRadius: 36,
            borderTopRightRadius: 36,
          }}
        />
      </View>

      {/* Bottom Half: Content & Action Area */}
      <SafeAreaView
        edges={['bottom']}
        className="flex-1 px-8 justify-between pb-8 bg-white"
      >
        <View className="items-center pt-2">
          {/* Mini Logo */}
          <View className="w-11 h-11 rounded-full bg-[#5194EA15] border border-[#5194EA30] items-center justify-center mb-4 overflow-hidden">
            <Image
              source={require('../../../assets/logo/logomagis.png')}
              style={{ width: 28, height: 28 }}
              contentFit="contain"
            />
          </View>

          {/* Title Text */}
          <Text className="text-2xl font-extrabold text-gray-900 text-center tracking-tight leading-snug mb-2.5">
            Temukan & Sewa Kos Impianmu Sekarang
          </Text>

          {/* Subtitle Text */}
          <Text className="text-sm text-gray-500 text-center leading-relaxed px-4">
            Akses ribuan hunian kos nyaman, booking instan, dan kelola pembayaran tagihan tanpa ribet.
          </Text>
        </View>

        {/* Bottom Action Button */}
        <View className="w-full pt-4">
          <Button
            title="Mulai Sekarang"
            variant="default"
            size="lg"
            style={{ backgroundColor: '#5194EA' }}
            textStyle={{ color: '#FFFFFF' }}
            className="w-full h-14 rounded-2xl shadow-md"
            textClassName="text-base font-bold text-white tracking-wide"
            onPress={onGetStarted}
            icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}
