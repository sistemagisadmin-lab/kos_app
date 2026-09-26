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
  Sparkles,
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
    <SafeAreaView className="flex-1 bg-[#FFFDF0]">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, padding: 20, justifyContent: 'center' }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header Brand Section */}
          <View className="items-center mb-6">
            <View
              style={{
                borderWidth: 3,
                borderColor: '#000000',
                boxShadow: '4px 4px 0px 0px #000000',
                backgroundColor: '#A6FA37',
              }}
              className="w-20 h-20 items-center justify-center mb-3"
            >
              <Building2 size={42} color="#000000" strokeWidth={2.5} />
            </View>

            <View className="flex-row items-center gap-2 mb-1">
              <Badge variant="pink" label="v1.0" />
              <Badge variant="cyan" label="Sistem Kos Pintar" />
            </View>

            <Text className="text-3xl font-black text-black tracking-tight text-center uppercase mt-1">
              KOS-APP
            </Text>
            <Text className="text-xs font-bold text-gray-700 text-center uppercase tracking-wide">
              Manajemen Hunian & Tagihan Kos Tanpa Ribet
            </Text>
          </View>

          {/* Main Card */}
          <Card accentColor="#FFFFFF" className="mb-4">
            {/* Role Selection Switcher */}
            <Text className="text-xs font-black uppercase tracking-wider text-black mb-2">
              Pilih Peran Masuk:
            </Text>
            <View className="flex-row gap-2 mb-5">
              <Pressable
                onPress={() => setRole('tenant')}
                style={({ pressed }) => [
                  {
                    borderWidth: 2.5,
                    borderColor: '#000000',
                    boxShadow:
                      role === 'tenant'
                        ? '3px 3px 0px 0px #000000'
                        : '1px 1px 0px 0px #000000',
                    backgroundColor: role === 'tenant' ? '#FFDE59' : '#FFFFFF',
                    transform: pressed ? [{ translateX: 1 }, { translateY: 1 }] : [],
                  },
                ]}
                className="flex-1 py-2.5 px-2 items-center justify-center flex-row gap-1.5"
              >
                <User size={16} color="#000000" strokeWidth={2.5} />
                <Text className="text-xs font-black uppercase text-black">
                  Anak Kos
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setRole('owner')}
                style={({ pressed }) => [
                  {
                    borderWidth: 2.5,
                    borderColor: '#000000',
                    boxShadow:
                      role === 'owner'
                        ? '3px 3px 0px 0px #000000'
                        : '1px 1px 0px 0px #000000',
                    backgroundColor: role === 'owner' ? '#00F0FF' : '#FFFFFF',
                    transform: pressed ? [{ translateX: 1 }, { translateY: 1 }] : [],
                  },
                ]}
                className="flex-1 py-2.5 px-2 items-center justify-center flex-row gap-1.5"
              >
                <KeyRound size={16} color="#000000" strokeWidth={2.5} />
                <Text className="text-xs font-black uppercase text-black">
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
              icon={<Mail size={18} color="#000000" />}
              error={errors.email}
            />

            {/* Password Input */}
            <Input
              label="Kata Sandi"
              placeholder="Masukkan password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                if (errors.password)
                  setErrors((prev) => ({ ...prev, password: undefined }));
              }}
              secureTextEntry={!showPassword}
              icon={<Lock size={18} color="#000000" />}
              rightIcon={
                <Pressable onPress={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? (
                    <EyeOff size={18} color="#000000" />
                  ) : (
                    <Eye size={18} color="#000000" />
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
                  style={{
                    borderWidth: 2,
                    borderColor: '#000000',
                    backgroundColor: rememberMe ? '#A6FA37' : '#FFFFFF',
                  }}
                  className="w-5 h-5 items-center justify-center"
                >
                  {rememberMe && (
                    <Text className="text-xs font-black text-black">✓</Text>
                  )}
                </View>
                <Text className="text-xs font-bold text-black uppercase">
                  Ingat Saya
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Lupa Password',
                    'Fitur reset password akan mengirimkan tautan reset ke email / WhatsApp Anda.'
                  )
                }
              >
                <Text className="text-xs font-black text-black uppercase underline">
                  Lupa Password?
                </Text>
              </Pressable>
            </View>

            {/* Login Button */}
            <Button
              title="MASUK SEKARANG"
              variant="lime"
              size="lg"
              onPress={handleLogin}
              loading={isLoading}
              icon={<LogIn size={20} color="#000000" strokeWidth={3} />}
            />

            {/* Demo Quick Fill */}
            <View className="mt-5 pt-3 border-t-2 border-dashed border-gray-300">
              <Text className="text-[10px] font-extrabold uppercase text-gray-600 text-center mb-2">
                ⚡ Akun Demo Cepat (Klik untuk Uji Coba):
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
                  variant="cyan"
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
              <Text className="text-xs font-bold text-gray-800">
                Belum punya akun?
              </Text>
              <Pressable
                onPress={() =>
                  Alert.alert(
                    'Daftar Akun',
                    'Halaman registrasi akun baru siap dibuat!'
                  )
                }
              >
                <Text className="text-xs font-black text-black underline uppercase">
                  Daftar Sekarang
                </Text>
              </Pressable>
            </View>

            <View className="flex-row items-center gap-1 bg-[#FFDE59] px-3 py-1 border-2 border-black">
              <ShieldCheck size={14} color="#000000" strokeWidth={2.5} />
              <Text className="text-[10px] font-black uppercase text-black">
                Terlindungi Enkripsi Keamanan End-to-End
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
