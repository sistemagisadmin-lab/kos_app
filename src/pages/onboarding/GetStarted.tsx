import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  ImageSourcePropType,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Building2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react-native';
import { Button } from '@/components/ui/Button';

export interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  imageSource?: ImageSourcePropType;
  icon?: React.ReactNode;
}

const slides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Cari & Temukan Kos Nyaman Impianmu',
    description:
      'Ribuan pilihan kamar kos strategis, bersih, dan berfasilitas lengkap siap dihuni kapan saja.',
    icon: <Building2 size={68} color="#5194EA" strokeWidth={1.75} />,
  },
  {
    id: '2',
    title: 'Booking Cepat & Pembayaran Aman',
    description:
      'Sewa kamar dan bayar tagihan bulanan langsung dari aplikasi dengan jaminan keamanan transaksi 100%.',
    icon: <ShieldCheck size={68} color="#5194EA" strokeWidth={1.75} />,
  },
  {
    id: '3',
    title: 'Kelola Hunian Praktis Dalam Satu Genggaman',
    description:
      'Komunikasi mudah dengan pemilik kos, ajukan komplain fasilitas, dan pantau status tagihan tanpa ribet.',
    icon: <Sparkles size={68} color="#5194EA" strokeWidth={1.75} />,
  },
];

interface GetStartedProps {
  onFinish?: () => void;
}

export default function GetStartedScreen({ onFinish }: GetStartedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const isLastSlide = currentIndex === slides.length - 1;

  const handleNext = () => {
    if (!isLastSlide) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      if (onFinish) {
        onFinish();
      }
    }
  };

  const handleSkip = () => {
    if (onFinish) {
      onFinish();
    } else {
      setCurrentIndex(slides.length - 1);
    }
  };

  const currentSlide = slides[currentIndex];

  return (
    <SafeAreaView className="flex-1 bg-white justify-between">
      {/* Top Header - Skip Button */}
      <View className="flex-row justify-end px-6 pt-2">
        <Pressable
          onPress={handleSkip}
          className="py-1.5 px-3 rounded-full active:bg-gray-100"
        >
          <Text className="text-sm font-medium text-gray-400">Lewati</Text>
        </Pressable>
      </View>

      {/* Main Content Area */}
      <View className="items-center px-6 flex-1 justify-center">
        {/* Illustration Container Box with Clean Pure White */}
        <View className="w-full max-w-[320px] aspect-square rounded-3xl items-center justify-center p-6 mb-8 border border-gray-100 bg-white shadow-sm">
          {currentSlide.imageSource ? (
            <Image
              source={currentSlide.imageSource}
              className="w-full h-full"
              resizeMode="contain"
            />
          ) : (
            <View className="items-center justify-center">
              <View
                style={{ backgroundColor: '#5194EA18' }}
                className="w-24 h-24 rounded-2xl items-center justify-center mb-3"
              >
                {currentSlide.icon}
              </View>
              <Text
                style={{ color: '#3A7BD5', borderColor: '#5194EA40' }}
                className="text-xs font-semibold bg-white border px-3 py-1 rounded-full shadow-xs"
              >
                Asset Gambar Anda
              </Text>
            </View>
          )}
        </View>

        {/* Pagination Indicators (Pill + Dots with exact #5194EA) */}
        <View className="flex-row items-center justify-center gap-1.5 mb-8">
          {slides.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <Pressable
                key={index}
                onPress={() => setCurrentIndex(index)}
                style={{
                  backgroundColor: isActive ? '#5194EA' : '#E5E7EB',
                }}
                className={`h-2 rounded-full transition-all duration-200 ${
                  isActive ? 'w-7' : 'w-2'
                }`}
              />
            );
          })}
        </View>

        {/* Text Section */}
        <View className="items-center max-w-[340px]">
          <Text className="text-2xl font-bold text-gray-900 text-center tracking-tight mb-2.5">
            {currentSlide.title}
          </Text>
          <Text className="text-sm text-gray-500 text-center leading-relaxed px-2">
            {currentSlide.description}
          </Text>
        </View>
      </View>

      {/* Bottom Action Area with exact #5194EA Button */}
      <View className="px-6 pb-8 pt-4">
        <Button
          title={isLastSlide ? 'Mulai Sekarang' : 'Lanjut'}
          variant="default"
          size="lg"
          style={{ backgroundColor: '#5194EA' }}
          textStyle={{ color: '#FFFFFF' }}
          className="w-full h-14 rounded-2xl shadow-md"
          textClassName="text-base font-bold text-white tracking-wide"
          onPress={handleNext}
          icon={<ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />}
        />
      </View>
    </SafeAreaView>
  );
}
