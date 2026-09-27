import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import CustomAlertModal from '../../components/CustomAlertModal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import { ArrowLeft, Mail, Lock, Eye, EyeOff, User, Building2 } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import Svg, { Path } from 'react-native-svg';
import { Button } from '@/components/ui/Button';
import { authService, AuthUser } from '@/services/authService';

export type UserRole = 'seeker' | 'owner';

export interface LoginFormData {
  email: string;
  password: string;
}

interface LoginProps {
  onBack?: () => void;
  onGoToRegister?: () => void;
  onSuccess?: (role: UserRole, user?: AuthUser) => void;
}

export default function LoginPage({ onBack, onGoToRegister, onSuccess }: LoginProps) {
  const [role, setRole] = useState<UserRole>('seeker');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [alertModal, setAlertModal] = useState<{
    visible: boolean;
    title: string;
    message: string;
    type?: 'success' | 'warning' | 'error' | 'info';
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    visible: false,
    title: '',
    message: '',
    type: 'info',
  });

  const showAlert = (
    title: string,
    message: string,
    type: 'success' | 'warning' | 'error' | 'info' = 'info',
    confirmText = 'Mengerti',
    cancelText?: string,
    onConfirm?: () => void
  ) => {
    setAlertModal({
      visible: true,
      title,
      message,
      type,
      confirmText,
      cancelText,
      onConfirm,
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.signIn({
        email: data.email.trim(),
        password: data.password,
      });

      setIsLoading(false);

      if (response.success && response.data) {
        if (onSuccess) {
          onSuccess(role, response.data.user);
        }
      } else {
        showAlert(
          'Gagal Masuk',
          response.error?.message || 'Email atau kata sandi tidak sesuai. Silakan coba lagi.',
          'error'
        );
      }
    } catch (err: any) {
      setIsLoading(false);
      showAlert(
        'Terjadi Kesalahan',
        err.message || 'Gagal memproses login ke server.',
        'error'
      );
    }
  };

  const handleSocialLogin = (provider: string) => {
    if (onSuccess) {
      onSuccess(role);
    }
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
                    backgroundColor: role === 'seeker' ? '#EFF6FF' : '#FFFFFF',
                    borderColor: role === 'seeker' ? '#5194EA' : '#E5E7EB',
                    borderWidth: role === 'seeker' ? 1.5 : 1,
                    transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                  },
                ]}
                className="flex-1 p-3.5 rounded-2xl flex-row items-center gap-3 shadow-xs"
              >
                <View
                  style={{
                    backgroundColor: role === 'seeker' ? '#5194EA20' : '#F3F4F6',
                  }}
                  className="w-10 h-10 rounded-xl items-center justify-center"
                >
                  <User
                    size={20}
                    color={role === 'seeker' ? '#3A7BD5' : '#9CA3AF'}
                    strokeWidth={2.2}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    style={{
                      color: role === 'seeker' ? '#1E40AF' : '#374151',
                    }}
                    className="text-sm font-bold leading-tight"
                  >
                    Pencari Kos
                  </Text>
                  <Text
                    style={{
                      color: role === 'seeker' ? '#3B82F6' : '#9CA3AF',
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
                    backgroundColor: role === 'owner' ? '#EFF6FF' : '#FFFFFF',
                    borderColor: role === 'owner' ? '#5194EA' : '#E5E7EB',
                    borderWidth: role === 'owner' ? 1.5 : 1,
                    transform: pressed ? [{ scale: 0.98 }] : [{ scale: 1 }],
                  },
                ]}
                className="flex-1 p-3.5 rounded-2xl flex-row items-center gap-3 shadow-xs"
              >
                <View
                  style={{
                    backgroundColor: role === 'owner' ? '#5194EA20' : '#F3F4F6',
                  }}
                  className="w-10 h-10 rounded-xl items-center justify-center"
                >
                  <Building2
                    size={20}
                    color={role === 'owner' ? '#3A7BD5' : '#9CA3AF'}
                    strokeWidth={2.2}
                  />
                </View>
                <View className="flex-1">
                  <Text
                    style={{
                      color: role === 'owner' ? '#1E40AF' : '#374151',
                    }}
                    className="text-sm font-bold leading-tight"
                  >
                    Mitra Kos
                  </Text>
                  <Text
                    style={{
                      color: role === 'owner' ? '#3B82F6' : '#9CA3AF',
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
            <Text className="text-sm text-gray-400 font-normal leading-relaxed mb-6">
              Silakan masukkan email dan kata sandi Anda untuk melanjutkan.
            </Text>

            {/* Email Input Field */}
            <View className="mb-4">
              <Text className="text-xs font-bold text-gray-700 mb-1.5 ml-1">
                Alamat Email <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                name="email"
                rules={{
                  required: 'Alamat email wajib diisi',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Format alamat email tidak valid',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderColor: errors.email ? '#EF4444' : '#E5E7EB',
                    }}
                    className="w-full bg-white rounded-2xl px-4 py-3.5 flex-row items-center border"
                  >
                    <View className="mr-3">
                      <Mail
                        size={18}
                        color={errors.email ? '#EF4444' : '#9CA3AF'}
                      />
                    </View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="user@example.com"
                      placeholderTextColor="#A0AEC0"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="flex-1 text-sm text-gray-900 font-medium p-0"
                    />
                  </View>
                )}
              />
              {errors.email && (
                <Text className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                  {errors.email.message}
                </Text>
              )}
            </View>

            {/* Password Input Field */}
            <View className="mb-5">
              <Text className="text-xs font-bold text-gray-700 mb-1.5 ml-1">
                Kata Sandi <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Kata sandi wajib diisi',
                  minLength: {
                    value: 6,
                    message: 'Kata sandi minimal 6 karakter',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderColor: errors.password ? '#EF4444' : '#E5E7EB',
                    }}
                    className="w-full bg-white rounded-2xl px-4 py-3.5 flex-row items-center border"
                  >
                    <View className="mr-3">
                      <Lock
                        size={18}
                        color={errors.password ? '#EF4444' : '#9CA3AF'}
                      />
                    </View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Masukkan kata sandi"
                      placeholderTextColor="#A0AEC0"
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      className="flex-1 text-sm text-gray-900 font-medium p-0"
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      className="p-1"
                    >
                      {showPassword ? (
                        <EyeOff size={18} color="#9CA3AF" />
                      ) : (
                        <Eye size={18} color="#9CA3AF" />
                      )}
                    </Pressable>
                  </View>
                )}
              />
              {errors.password && (
                <Text className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Continue / Masuk Button (Solid Blue #5194EA) */}
            <Button
              title="Masuk Sekarang"
              loading={isLoading || isSubmitting}
              style={{
                backgroundColor: '#5194EA',
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
                    showAlert(
                      'Daftar Akun',
                      `Membuka halaman pendaftaran untuk ${
                        role === 'seeker' ? 'Pencari Kos' : 'Mitra Kos'
                      }...`,
                      'info'
                    );
                  }
                }}
              >
                <Text className="text-sm font-bold text-[#5194EA]">
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

            {/* Google Social Login Only */}
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
                  showAlert('Syarat & Ketentuan', 'Halaman Syarat & Ketentuan Layanan Aplikasi Sistemagis Kos.', 'info')
                }
              >
                <Text className="text-xs font-semibold text-[#5194EA]">
                  Syarat & Ketentuan
                </Text>
              </Pressable>
              <Text className="text-xs text-gray-400">dan</Text>
              <Pressable
                onPress={() =>
                  showAlert('Kebijakan Privasi', 'Halaman Kebijakan Privasi Data Pengguna Sistemagis Kos.', 'info')
                }
              >
                <Text className="text-xs font-semibold text-[#5194EA]">
                  Kebijakan Privasi
                </Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* In-App Custom Alert Modal */}
      <CustomAlertModal
        visible={alertModal.visible}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        confirmText={alertModal.confirmText}
        cancelText={alertModal.cancelText}
        onConfirm={() => {
          if (alertModal.onConfirm) {
            alertModal.onConfirm();
          }
          setAlertModal({ ...alertModal, visible: false });
        }}
        onClose={() => setAlertModal({ ...alertModal, visible: false })}
      />
    </SafeAreaView>
  );
}
