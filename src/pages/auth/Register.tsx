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
import {
  ArrowLeft,
  User,
  Phone,
  MapPin,
  Compass,
  Lock,
  Eye,
  EyeOff,
  Building2,
} from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import { Button } from '@/components/ui/Button';

export type UserRole = 'seeker' | 'owner';

export interface RegisterFormData {
  fullName: string;
  phoneNumber: string;
  originCity: string;
  birthPlace: string;
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

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      fullName: '',
      phoneNumber: '',
      originCity: '',
      birthPlace: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = (data: RegisterFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const roleName = role === 'seeker' ? 'Pencari Kos' : 'Mitra Kos';
      Alert.alert(
        'Pendaftaran Berhasil!',
        `Selamat ${data.fullName}, akun ${roleName} Anda telah berhasil dibuat. Silakan masuk untuk melanjutkan.`,
        [
          {
            text: 'Masuk Sekarang',
            onPress: () => {
              if (onSuccess) {
                onSuccess();
              } else if (onGoToLogin) {
                onGoToLogin();
              }
            },
          },
        ]
      );
    }, 1200);
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
            {onBack || onGoToLogin ? (
              <Pressable
                onPress={onBack || onGoToLogin}
                className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center active:bg-gray-200"
              >
                <ArrowLeft size={20} color="#111827" strokeWidth={2.2} />
              </Pressable>
            ) : (
              <View className="h-10" />
            )}
          </View>

          {/* Role Selection Cards */}
          <View className="flex-row gap-3 mb-6">
            {/* Pencari Kos */}
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

            {/* Mitra Kos */}
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
            Daftar Akun {role === 'seeker' ? 'Pencari Kos' : 'Mitra Kos'}
          </Text>
          <Text className="text-sm text-gray-400 font-normal leading-relaxed mb-6">
            Lengkapi data di bawah ini untuk membuat akun baru Anda.
          </Text>

          {/* Form Fields using react-hook-form */}
          <View className="gap-4 mb-6">
            {/* Nama Lengkap */}
            <View>
              <Text className="text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                Nama Lengkap
              </Text>
              <Controller
                control={control}
                name="fullName"
                rules={{
                  required: 'Nama lengkap wajib diisi',
                  minLength: {
                    value: 3,
                    message: 'Nama lengkap minimal 3 karakter',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderColor: errors.fullName ? '#EF4444' : '#E5E7EB',
                    }}
                    className="w-full bg-white rounded-2xl px-4 py-3.5 flex-row items-center border"
                  >
                    <View className="mr-3">
                      <User
                        size={18}
                        color={errors.fullName ? '#EF4444' : '#9CA3AF'}
                      />
                    </View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Masukkan nama lengkap Anda"
                      placeholderTextColor="#A0AEC0"
                      autoCapitalize="words"
                      className="flex-1 text-base text-gray-900 font-medium p-0"
                    />
                  </View>
                )}
              />
              {errors.fullName && (
                <Text className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.fullName.message}
                </Text>
              )}
            </View>

            {/* Nomor HP */}
            <View>
              <Text className="text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                Nomor Handphone (WhatsApp)
              </Text>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{
                  required: 'Nomor handphone wajib diisi',
                  pattern: {
                    value: /^[0-9+]{8,16}$/,
                    message: 'Nomor handphone harus berupa angka (minimal 8 digit)',
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
                      placeholder="Contoh: 08123456789"
                      placeholderTextColor="#A0AEC0"
                      keyboardType="phone-pad"
                      className="flex-1 text-base text-gray-900 font-medium p-0"
                    />
                  </View>
                )}
              />
              {errors.phoneNumber && (
                <Text className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.phoneNumber.message}
                </Text>
              )}
            </View>

            {/* Asal Mana (Kota/Daerah Asal) */}
            <View>
              <Text className="text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                Asal Kota / Daerah
              </Text>
              <Controller
                control={control}
                name="originCity"
                rules={{
                  required: 'Kota atau daerah asal wajib diisi',
                  minLength: {
                    value: 2,
                    message: 'Nama kota/daerah minimal 2 karakter',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderColor: errors.originCity ? '#EF4444' : '#E5E7EB',
                    }}
                    className="w-full bg-white rounded-2xl px-4 py-3.5 flex-row items-center border"
                  >
                    <View className="mr-3">
                      <MapPin
                        size={18}
                        color={errors.originCity ? '#EF4444' : '#9CA3AF'}
                      />
                    </View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Contoh: Jakarta, Surabaya, Bandung"
                      placeholderTextColor="#A0AEC0"
                      autoCapitalize="words"
                      className="flex-1 text-base text-gray-900 font-medium p-0"
                    />
                  </View>
                )}
              />
              {errors.originCity && (
                <Text className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.originCity.message}
                </Text>
              )}
            </View>

            {/* Lahir di Mana (Tempat Lahir) */}
            <View>
              <Text className="text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                Tempat Lahir
              </Text>
              <Controller
                control={control}
                name="birthPlace"
                rules={{
                  required: 'Tempat kelahiran wajib diisi',
                  minLength: {
                    value: 2,
                    message: 'Tempat kelahiran minimal 2 karakter',
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <View
                    style={{
                      borderColor: errors.birthPlace ? '#EF4444' : '#E5E7EB',
                    }}
                    className="w-full bg-white rounded-2xl px-4 py-3.5 flex-row items-center border"
                  >
                    <View className="mr-3">
                      <Compass
                        size={18}
                        color={errors.birthPlace ? '#EF4444' : '#9CA3AF'}
                      />
                    </View>
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Kota tempat Anda lahir"
                      placeholderTextColor="#A0AEC0"
                      autoCapitalize="words"
                      className="flex-1 text-base text-gray-900 font-medium p-0"
                    />
                  </View>
                )}
              />
              {errors.birthPlace && (
                <Text className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.birthPlace.message}
                </Text>
              )}
            </View>

            {/* Password */}
            <View>
              <Text className="text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                Password
              </Text>
              <Controller
                control={control}
                name="password"
                rules={{
                  required: 'Password wajib diisi',
                  minLength: {
                    value: 6,
                    message: 'Password minimal 6 karakter',
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
                      className="flex-1 text-base text-gray-900 font-medium p-0"
                    />
                    <Pressable
                      onPress={() => setShowPassword(!showPassword)}
                      hitSlop={8}
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
                <Text className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.password.message}
                </Text>
              )}
            </View>

            {/* Konfirmasi Password */}
            <View>
              <Text className="text-xs font-semibold text-gray-700 mb-1.5 ml-1">
                Konfirmasi Password
              </Text>
              <Controller
                control={control}
                name="confirmPassword"
                rules={{
                  required: 'Konfirmasi password wajib diisi',
                  validate: (value) =>
                    value === passwordValue || 'Konfirmasi password tidak cocok dengan password di atas',
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
                      placeholder="Ulangi password Anda"
                      placeholderTextColor="#A0AEC0"
                      secureTextEntry={!showConfirmPassword}
                      className="flex-1 text-base text-gray-900 font-medium p-0"
                    />
                    <Pressable
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                      hitSlop={8}
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
                <Text className="text-xs text-red-500 mt-1 ml-1 font-medium">
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>
          </View>

          {/* Submit / Daftar Sekarang Button */}
          <Button
            title="Daftar Sekarang"
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

          {/* Link Sudah punya akun? Masuk di sini */}
          <View className="flex-row justify-center items-center mt-5 mb-3">
            <Text className="text-sm text-gray-500 font-normal">
              Sudah punya akun?{' '}
            </Text>
            <Pressable onPress={onGoToLogin || onBack}>
              <Text className="text-sm font-bold text-[#58c763]">
                Masuk di sini
              </Text>
            </Pressable>
          </View>

          {/* Terms / Disclaimer */}
          <View className="items-center pt-2">
            <Text className="text-[11px] text-gray-400 text-center leading-relaxed">
              Dengan mendaftar, Anda menyetujui Ketentuan Layanan & Kebijakan Privasi kos-app.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
