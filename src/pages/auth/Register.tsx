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
import {
  ArrowLeft,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@/components/ui/Button';
import { authService } from '@/services/authService';

export type UserRole = 'seeker' | 'owner';

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterProps {
  onBack?: () => void;
  onGoToLogin?: () => void;
  onSuccess?: () => void;
}

export default function RegisterPage({
  onBack,
  onGoToLogin,
  onSuccess,
}: RegisterProps) {
  const [role, setRole] = useState<UserRole>('seeker');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await authService.signUp({
        name: data.name.trim(),
        email: data.email.trim(),
        password: data.password,
      });

      setIsLoading(false);

      if (response.success && response.data) {
        showAlert(
          'Pendaftaran Berhasil!',
          `Selamat ${response.data.user?.name || data.name}, akun Anda telah berhasil terdaftar.`,
          'success',
          'Masuk ke Akun',
          undefined,
          () => {
            if (onSuccess) {
              onSuccess();
            } else if (onGoToLogin) {
              onGoToLogin();
            }
          }
        );
      } else {
        showAlert(
          'Gagal Mendaftar',
          response.error?.message || 'Pendaftaran tidak dapat diproses. Silakan periksa kembali data Anda.',
          'error'
        );
      }
    } catch (err: any) {
      setIsLoading(false);
      showAlert(
        'Terjadi Kesalahan',
        err.message || 'Gagal terhubung ke server pendaftaran.',
        'error'
      );
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
            paddingBottom: 36,
            backgroundColor: '#FFFFFF',
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Top Header / Back Button */}
          <View className="pt-2 pb-5">
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

          {/* Role Selector Cards */}
          <View className="flex-row gap-3 mb-6">
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

          {/* Title Header */}
          <Text className="text-[26px] font-extrabold text-gray-900 tracking-tight leading-tight mb-2">
            Daftar Akun {role === 'seeker' ? 'Pencari' : 'Mitra'}
          </Text>
          <Text className="text-sm text-gray-400 font-normal leading-relaxed mb-6">
            Lengkapi data di bawah ini untuk membuat akun baru Anda.
          </Text>

          {/* Form Fields */}
          <View className="gap-4 mb-6">
            {/* 1. Nama Lengkap */}
            <View>
              <Text className="text-xs font-bold text-gray-700 mb-1.5 ml-1">
                Nama Lengkap <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                name="name"
                rules={{
                  required: 'Nama lengkap wajib diisi',
                  minLength: {
                    value: 3,
                    message: 'Nama minimal 3 karakter',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderColor: errors.name ? '#EF4444' : '#E5E7EB',
                    }}
                    className="w-full bg-white rounded-2xl px-4 py-3.5 flex-row items-center border"
                  >
                    <View className="mr-3">
                      <User
                        size={18}
                        color={errors.name ? '#EF4444' : '#9CA3AF'}
                      />
                    </View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Contoh: Budi Santoso"
                      placeholderTextColor="#A0AEC0"
                      className="flex-1 text-sm text-gray-900 font-medium p-0"
                    />
                  </View>
                )}
              />
              {errors.name && (
                <Text className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                  {errors.name.message}
                </Text>
              )}
            </View>

            {/* 2. Email */}
            <View>
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

            {/* 3. Kata Sandi */}
            <View>
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
                      placeholder="Minimal 6 karakter"
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

            {/* 4. Konfirmasi Kata Sandi */}
            <View>
              <Text className="text-xs font-bold text-gray-700 mb-1.5 ml-1">
                Konfirmasi Kata Sandi <Text className="text-red-500">*</Text>
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: 'Konfirmasi kata sandi wajib diisi',
                  validate: (val) =>
                    val === passwordValue || 'Kata sandi konfirmasi tidak cocok',
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderColor: errors.confirmPassword ? '#EF4444' : '#E5E7EB',
                    }}
                    className="w-full bg-white rounded-2xl px-4 py-3.5 flex-row items-center border"
                  >
                    <View className="mr-3">
                      <Lock
                        size={18}
                        color={errors.confirmPassword ? '#EF4444' : '#9CA3AF'}
                      />
                    </View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Ulangi kata sandi"
                      placeholderTextColor="#A0AEC0"
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                      className="flex-1 text-sm text-gray-900 font-medium p-0"
                    />
                    <Pressable
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="p-1"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} color="#9CA3AF" />
                      ) : (
                        <Eye size={18} color="#9CA3AF" />
                      )}
                    </Pressable>
                  </View>
                )}
              />
              {errors.confirmPassword && (
                <Text className="text-xs text-red-500 mt-1.5 ml-1 font-medium">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </View>

          {/* Submit Button (Solid Blue #5194EA) */}
          <Button
            title="Daftar Sekarang"
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

          {/* Sudah punya akun? Masuk di sini */}
          <View className="flex-row justify-center items-center mt-5">
            <Text className="text-sm text-gray-500 font-normal">
              Sudah punya akun?{' '}
            </Text>
            <Pressable
              onPress={() => {
                if (onGoToLogin) {
                  onGoToLogin();
                } else if (onBack) {
                  onBack();
                }
              }}
            >
              <Text className="text-sm font-bold text-[#5194EA]">
                Masuk di sini
              </Text>
            </Pressable>
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
