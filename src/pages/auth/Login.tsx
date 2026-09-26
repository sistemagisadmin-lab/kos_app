import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Building2,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  ShieldCheck,
  User,
  KeyRound,
} from 'lucide-react-native';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export type UserRole = 'tenant' | 'owner';

export default function LoginPage() {
  const [role, setRole] = useState<UserRole>('tenant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Email atau Nomor HP wajib diisi';
    }
    if (!password) {
      newErrors.password = 'Kata sandi wajib diisi';
    } else if (password.length < 6) {
      newErrors.password = 'Kata sandi minimal 6 karakter';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Login Berhasil!',
        `Selamat datang kembali sebagai ${
          role === 'tenant' ? 'Penyewa Kos' : 'Pemilik Kos'
        } (${email})`
      );
    }, 1000);
  };

  const handleQuickDemo = (demoRole: UserRole) => {
    setRole(demoRole);
    if (demoRole === 'tenant') {
      setEmail('penyewa@kosapp.id');
      setPassword('penyewa123');
    } else {
      setEmail('pemilik@kosapp.id');
      setPassword('pemilik123');
    }
    setErrors({});
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 24, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Brand Section */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 rounded-2xl bg-emerald-100 items-center justify-center mb-3 shadow-xs border border-emerald-200/50">
              <Building2 size={36} color="#059669" strokeWidth={2} />
            </View>

            <View className="flex-row items-center gap-1.5 mb-2">
              <Badge variant="secondary" label="v1.0" />
              <Badge variant="success" label="Sistem Kos Pintar" />
            </View>

            <Text className="text-2xl font-bold text-gray-900 tracking-tight text-center">
              Selamat Datang Kembali
            </Text>
            <Text className="text-xs font-normal text-gray-500 text-center mt-1">
              Masuk ke akun Kos-App Anda untuk melanjutkan
            </Text>
          </View>

          {/* Main Card */}
          <Card className="mb-4">
            {/* Role Selection Switcher */}
            <Text className="text-xs font-semibold text-gray-700 mb-2">
              Masuk Sebagai:
            </Text>
            <View className="flex-row gap-2 mb-4 bg-gray-100 p-1 rounded-xl">
              <Pressable
                onPress={() => setRole('tenant')}
                className={`flex-1 py-2 rounded-lg items-center justify-center flex-row gap-1.5 transition-all ${
                  role === 'tenant' ? 'bg-white shadow-xs' : 'bg-transparent'
                }`}
              >
                <User size={15} color={role === 'tenant' ? '#059669' : '#6B7280'} />
                <Text
                  className={`text-xs font-semibold ${
                    role === 'tenant' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  Anak Kos
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setRole('owner')}
                className={`flex-1 py-2 rounded-lg items-center justify-center flex-row gap-1.5 transition-all ${
                  role === 'owner' ? 'bg-white shadow-xs' : 'bg-transparent'
                }`}
              >
                <KeyRound size={15} color={role === 'owner' ? '#059669' : '#6B7280'} />
                <Text
                  className={`text-xs font-semibold ${
                    role === 'owner' ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  Pemilik Kos
                </Text>
              </Pressable>
            </View>

            {/* Email / Username Input */}
            <Input
              label="Email / No. WhatsApp"
              placeholder="contoh: user@gmail.com / 0812..."
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              icon={<Mail size={16} color="#6B7280" />}
              error={errors.email}
            />

            {/* Password Input */}
            <Input
              label="Kata Sandi"
              placeholder="Masukkan kata sandi"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              secureTextEntry={!showPassword}
              icon={<Lock size={16} color="#6B7280" />}
              rightIcon={
                <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (
                    <EyeOff size={16} color="#6B7280" />
                  ) : (
                    <Eye size={16} color="#6B7280" />
                  )}
                </Pressable>
              }
              error={errors.password}
            />

            {/* Options: Remember Me & Forgot Password */}
            <View className="flex-row items-center justify-between mt-2 mb-5">
              <Pressable
                onPress={() => setRememberMe(!rememberMe)}
                className="flex-row items-center gap-2"
              >
                <View
                  className={`w-4 h-4 rounded border items-center justify-center ${
                    rememberMe
                      ? 'bg-emerald-600 border-emerald-600'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  {rememberMe && (
                    <Text className="text-[10px] font-bold text-white leading-none">
                      ✓
                    </Text>
                  )}
                </View>
                <Text className="text-xs font-medium text-gray-700">Ingat Saya</Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Lupa Password',
                    'Fitur reset password akan mengirimkan tautan reset ke email Anda.'
                  )
                }
              >
                <Text className="text-xs font-semibold text-emerald-600">
                  Lupa Kata Sandi?
                </Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Button
              title="Masuk Sekarang"
              variant="default"
              size="lg"
              className="w-full bg-emerald-600"
              onPress={handleLogin}
              loading={isLoading}
              icon={<LogIn size={18} color="#FFFFFF" />}
            />

            {/* Demo Quick Fill */}
            <View className="mt-4 pt-4 border-t border-gray-100">
              <Text className="text-[11px] font-medium text-gray-400 text-center mb-2">
                ⚡ Akun Uji Coba Cepat:
              </Text>
              <View className="flex-row gap-2">
                <Button
                  title="Demo Anak Kos"
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onPress={() => handleQuickDemo('tenant')}
                />
                <Button
                  title="Demo Pemilik"
                  variant="secondary"
                  size="sm"
                  className="flex-1"
                  onPress={() => handleQuickDemo('owner')}
                />
              </View>
            </View>
          </Card>

          {/* Footer Register Link */}
          <View className="items-center mt-2">
            <View className="flex-row items-center justify-center gap-1 mb-3">
              <Text className="text-xs text-gray-500">Belum punya akun?</Text>
              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Daftar Akun',
                    'Halaman registrasi akun baru siap dibuat!'
                  )
                }
              >
                <Text className="text-xs font-semibold text-emerald-600">
                  Daftar Sekarang
                </Text>
              </Pressable>
            </View>

            <View className="flex-row items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200/60">
              <ShieldCheck size={13} color="#059669" />
              <Text className="text-[10px] font-medium text-gray-500">
                Terlindungi Enkripsi Keamanan
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
