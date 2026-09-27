import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch, ApiResponse } from './api';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthSession {
  id: string;
  userId: string;
  expiresAt: string;
  token: string;
}

export interface AuthResponseData {
  session: AuthSession;
  user: AuthUser;
}

export interface SignUpPayload {
  email: string;
  password: string;
  name: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

const STORAGE_KEYS = {
  TOKEN: '@magikos_auth_token',
  USER: '@magikos_auth_user',
  SESSION: '@magikos_auth_session',
};

export const authService = {
  /**
   * Register new user via POST /api/auth/sign-up/email
   */
  async signUp(payload: SignUpPayload): Promise<ApiResponse<AuthResponseData>> {
    const response = await apiFetch<AuthResponseData>('/api/auth/sign-up/email', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email.trim(),
        password: payload.password,
        name: payload.name.trim(),
      }),
    });

    if (response.success && response.data?.session?.token) {
      await authService.saveAuthData(response.data);
    }

    return response;
  },

  /**
   * Sign in user via POST /api/auth/sign-in/email
   */
  async signIn(payload: SignInPayload): Promise<ApiResponse<AuthResponseData>> {
    const response = await apiFetch<AuthResponseData>('/api/auth/sign-in/email', {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email.trim(),
        password: payload.password,
      }),
    });

    if (response.success && response.data?.session?.token) {
      await authService.saveAuthData(response.data);
    }

    return response;
  },

  /**
   * Sign out user via POST /api/auth/sign-out
   */
  async signOut(): Promise<ApiResponse<{ success: boolean }>> {
    const token = await authService.getStoredToken();
    let response: ApiResponse<{ success: boolean }> = { success: true };

    if (token) {
      response = await apiFetch<{ success: boolean }>('/api/auth/sign-out', {
        method: 'POST',
        token,
      });
    }

    await authService.clearAuthData();
    return response;
  },

  /**
   * Check active session via GET /api/auth/get-session
   */
  async getSession(): Promise<ApiResponse<AuthResponseData>> {
    const token = await authService.getStoredToken();
    if (!token) {
      return {
        success: false,
        error: {
          code: 'UNAUTHORIZED',
          message: 'Sesi belum tersedia atau sudah kedaluwarsa.',
        },
      };
    }

    return apiFetch<AuthResponseData>('/api/auth/get-session', {
      method: 'GET',
      token,
    });
  },

  /**
   * Persist session & user profile to AsyncStorage
   */
  async saveAuthData(data: AuthResponseData): Promise<void> {
    try {
      if (data.session?.token) {
        await AsyncStorage.setItem(STORAGE_KEYS.TOKEN, data.session.token);
      }
      if (data.session) {
        await AsyncStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(data.session));
      }
      if (data.user) {
        await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data.user));
      }
    } catch (e) {
      console.error('Error saving auth data to storage:', e);
    }
  },

  /**
   * Retrieve active session token from AsyncStorage
   */
  async getStoredToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN);
    } catch {
      return null;
    }
  },

  /**
   * Retrieve stored user profile from AsyncStorage
   */
  async getStoredUser(): Promise<AuthUser | null> {
    try {
      const userStr = await AsyncStorage.getItem(STORAGE_KEYS.USER);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  /**
   * Clear all auth session data from AsyncStorage
   */
  async clearAuthData(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.TOKEN,
        STORAGE_KEYS.USER,
        STORAGE_KEYS.SESSION,
      ]);
    } catch (e) {
      console.error('Error clearing auth data from storage:', e);
    }
  },
};
