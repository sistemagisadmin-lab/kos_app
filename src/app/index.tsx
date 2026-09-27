import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import DashboardMitra from '@/pages/mitra/DashboardMitra';
import LoginPage, { UserRole } from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';
import { authService, AuthUser } from '@/services/authService';

export default function AppEntryScreen() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register' | 'mitra'>('login');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkAuthSession() {
      try {
        const storedUser = await authService.getStoredUser();
        const storedToken = await authService.getStoredToken();
        if (storedToken && storedUser) {
          setCurrentUser(storedUser);
          setCurrentScreen('mitra');
        }
      } catch (e) {
        console.error('Error restoring auth session:', e);
      } finally {
        setIsCheckingAuth(false);
      }
    }

    checkAuthSession();
  }, []);

  const handleLoginSuccess = (role: UserRole, user?: AuthUser) => {
    if (user) {
      setCurrentUser(user);
    }
    setCurrentScreen('mitra');
  };

  const handleLogout = async () => {
    await authService.signOut();
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  if (isCheckingAuth) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#5194EA" />
      </View>
    );
  }

  if (currentScreen === 'register') {
    return (
      <RegisterPage
        onBack={() => setCurrentScreen('login')}
        onGoToLogin={() => setCurrentScreen('login')}
        onSuccess={() => setCurrentScreen('login')}
      />
    );
  }

  if (currentScreen === 'mitra') {
    return (
      <DashboardMitra
        onLogout={handleLogout}
      />
    );
  }

  return (
    <LoginPage
      onGoToRegister={() => setCurrentScreen('register')}
      onSuccess={handleLoginSuccess}
    />
  );
}
