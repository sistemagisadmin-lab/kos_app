import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, Phone, User, Building2 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { Button } from '@/components/ui/Button';

export type UserRole = 'seeker' | 'owner';

export interface LoginFormData {
  phoneNumber: string;
}

interface LoginProps {
  onBack?: () => void;
  onGoToRegister?: () => void;
  onSuccess?: () => void;
}

export default function LoginPage({ onBack, onGoToRegister, onSuccess }: LoginProps) {
  const [role, setRole] = useState<UserRole>('seeker');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      phoneNumber: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const roleName = role === 'seeker' ? 'Pencari Kos' : 'Mitra Kos';
      Alert.alert(
        'Kode Verifikasi Terkirim',
        `Kode OTP telah dikirimkan ke nomor ${data.phoneNumber} sebagai ${roleName}.`,
        [
          {
            text: 'OK',
            onPress: () => onSuccess && onSuccess(),
          },
        ]
      );
    }, 1000);
  };

  const handleSocialLogin = (provider: string) => {
    const roleName = role === 'seeker' ? 'Pencari Kos' : 'Mitra Kos';
    Alert.alert(`Masuk dengan ${provider}`, `Menghubungkan ke akun ${provider} sebagai ${roleName}...`);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }} className="flex-1 bg-white">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, backgroundColor: '#FFFFFF' }}
        className="flex-1 bg-white"
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: '#FFFFFF' }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 24,
            justifyContent: 'space-between',
            backgroundColor: '#FFFFFF',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Section */}
          <View>
            {/* Back Button */}
            <View className="pt-2 pb-6">
              {onBack ? (
                <Pressable
                  onPress={onBack}
                  className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center active:bg-gray-200"
                >
                  <ArrowLeft size={20} color="#111827" strokeWidth={2.2} />
                </Pressable>
              ) : (
                <View className="h-10" />
              )}
            </View>

            {/* Role Selector Cards (Pencari Kos vs Mitra Kos) */}
            <View className="flex-row gap-3 mb-6">
              {/* Card Pencari Kos */}
              <Pressable
                onPress={() => setRole('seeker')}
                style={({ pressed }) => [
                  {
                    backgroundColor: role === 'seeker' ? '#F0FDF4' : '#FFFFFF',
                    borderColor: role === 'seeker' ? '#58c763' : '#E5E7EB',
                    borderWidth: role === 'seeker' ? 1.5 : 1,
                    transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                  },
                ]}
                className="flex-1 p-3.5 rounded-2xl flex-row items-center gap-3 shadow-xs"
              >
                <View
                  style={{
                    backgroundColor: role === 'seeker' ? '#58c76320' : '#F3F4F6',
                  }}
                  className="w-10 h-10 rounded-xl items-center justify-center"
                >
                  <User
                    size={20}
                    color={role === 'seeker' ? '#3fa349' : '#9CA3AF'}
                    strokeWidth={2.2}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    style={{
                      color: role === 'seeker' ? '#166534' : '#374151',
                    }}
                    className="text-sm font-bold leading-tight"
                  >
                    Pencari Kos
                  </Text>
                  <Text
                    style={{
                      color: role === 'seeker' ? '#15803D' : '#9CA3AF',
                    }}
                    className="text-[11px] font-medium mt-0.5"
                  >
                    Sewa Kamar
                  </Text>
                </View>
              </Pressable>

              {/* Card Mitra Kos */}
              <Pressable
                onPress={() => setRole('owner')}
                style={({ pressed }) => [
                  {
                    backgroundColor: role === 'owner' ? '#F0FDF4' : '#FFFFFF',
                    borderColor: role === 'owner' ? '#58c763' : '#E5E7EB',
                    borderWidth: role === 'owner' ? 1.5 : 1,
                    transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                  },
                ]}
                className="flex-1 p-3.5 rounded-2xl flex-row items-center gap-3 shadow-xs"
              >
                <View
                  style={{
                    backgroundColor: role === 'owner' ? '#58c76320' : '#F3F4F6',
                  }}
                  className="w-10 h-10 rounded-xl items-center justify-center"
                >
                  <Building2
                    size={20}
                    color={role === 'owner' ? '#3fa349' : '#9CA3AF'}
                    strokeWidth={2.2}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    style={{
                      color: role === 'owner' ? '#166534' : '#374151',
                    }}
                    className="text-sm font-bold leading-tight"
                  >
                    Mitra Kos
                  </Text>
                  <Text
                    style={{
                      color: role === 'owner' ? '#15803D' : '#9CA3AF',
                    }}
                    className="text-[11px] font-medium mt-0.5"
                  >
                    Pemilik Kos
                  </Text>
                </View>
              </Pressable>
            </View>

            {/* Title & Subtitle in Indonesian */}
            <Text className="text-[26px] font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
              Masuk {role === 'seeker' ? 'Pencari Kos' : 'Mitra Kos'}
            </Text>
            <Text className="text-sm text-gray-400 font-normal leading-relaxed mb-8">
              {role === 'seeker'
                ? 'Silakan masukkan nomor ponsel Anda untuk mulai mencari & menyewa kos.'
                : 'Silakan masukkan nomor ponsel Anda untuk mengelola properti & kos Anda.'}
            </Text>

            {/* Phone Number Input Field with React Hook Form */}
            <View className="mb-5">
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: 'Nomor ponsel wajib diisi',
                  pattern: {
                    value: /^[0-9+]{8,16}$/,
                    message: 'Nomor ponsel harus berupa angka (minimal 8 digit)',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderColor: errors.phoneNumber ? '#EF4444' : '#E5E7EB',
                    }}
                    className="w-full bg-white rounded-2xl px-4 py-3.5 flex-row items-center border"
                  >
                    <View className="mr-3">
                      <Phone
                        size={18}
                        color={errors.phoneNumber ? '#EF4444' : '#9CA3AF'}
                      />
                    </View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Masukkan nomor ponsel Anda"
                      placeholderTextColor="#A0AEC0"
                      keyboardType="phone-pad"
                      className="flex-1 text-base text-gray-900 font-medium p-0"
                    />
                  </View>
                )}
              />
              {errors.phoneNumber && (
                <Text className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            {/* Continue / Lanjutkan Button (Solid Green with Pure White Text) */}
            <Button
              title="Lanjutkan"
              disabled={!isValid || isSubmitting}
              loading={isLoading || isSubmitting}
              style={{
                backgroundColor: '#58c763',
                opacity: isValid ? 1 : 0.6,
              }}
              textStyle={{
                color: '#FFFFFF',
              }}
              className="w-full h-14 rounded-2xl shadow-none"
              textClassName="text-base font-bold text-white"
              onPress={handleSubmit(onSubmit)}
            />

            {/* Belum punya akun? Daftar di sini */}
            <View className="flex-row justify-center items-center mt-5">
              <Text className="text-sm text-gray-500 font-normal">
                Belum punya akun?{' '}
              </Text>
              <Pressable
                onPress={() => {
                  if (onGoToRegister) {
                    onGoToRegister();
                  } else {
                    Alert.alert(
                      'Daftar Akun',
                      `Membuka halaman pendaftaran untuk ${
                        role === 'seeker' ? 'Pencari Kos' : 'Mitra Kos'
                      }...`
                    );
                  }
                }}
              >
                <Text className="text-sm font-bold text-[#58c763]">
                  Daftar di sini
                </Text>
              </Pressable>
            </View>

            {/* Divider 'Atau' */}
            <View className="flex-row items-center my-8">
              <View className="flex-1 h-[1px] bg-gray-200" />
              <Text className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Atau
              </Text>
              <View className="flex-1 h-[1px] bg-gray-200" />
            </View>

            {/* Google Social Login Only (Larger Icon) */}
            <View className="flex-row justify-center items-center">
              <Pressable
                onPress={() => handleSocialLogin('Google')}
                style={({ pressed }) => [
                  {
                    transform: pressed ? [{ scale: 0.94 }] : [{ scale: 1 }],
                  },
                ]}
                className="w-16 h-16 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center active:bg-gray-50"
              >
                <Svg width={32} height={32} viewBox="0 0 24 24">
                  <Path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <Path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <Path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <Path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </Svg>
              </Pressable>
            </View>
          </View>

          {/* Bottom Footer: Syarat & Ketentuan & Kebijakan Privasi */}
          <View className="items-center pb-6 pt-8">
            <Text className="text-xs text-gray-400 text-center leading-relaxed">
              Dengan masuk, Anda menyetujui
            </Text>
            <View className="flex-row items-center justify-center gap-1 mt-0.5">
              <Pressable
                onPress={() =>
                  Alert.alert('Syarat & Ketentuan', 'Halaman Syarat & Ketentuan Layanan.')
                }
              >
                <Text className="text-xs font-semibold text-[#58c763]">
                  Syarat & Ketentuan
                </Text>
              </Pressable>
              <Text className="text-xs text-gray-400">dan</Text>
              <Pressable
                onPress={() =>
                  Alert.alert('Kebijakan Privasi', 'Halaman Kebijakan Privasi.')
                }
              >
                <Text className="text-xs font-semibold text-[#58c763]">
                  Kebijakan Privasi
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
