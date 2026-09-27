import React, { useState } from 'react';
import DashboardMitra from '@/pages/mitra/DashboardMitra';
import LoginPage, { UserRole } from '@/pages/auth/Login';
import RegisterPage from '@/pages/auth/Register';

export default function AppEntryScreen() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register' | 'mitra'>('login');

  const handleLoginSuccess = (role: UserRole) => {
    if (role === 'owner') {
      setCurrentScreen('mitra');
    } else {
      // Sementara untuk role pencari kos atau mitra kos diarahkan ke dashboard mitra
      setCurrentScreen('mitra');
    }
  };

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
        onLogout={() => setCurrentScreen('login')}
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
