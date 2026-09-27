// Base API Configuration & HTTP Client
export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || 'https://magikos-webapp.vercel.app';

export interface ApiError {
  code?: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

/**
 * Generic fetch wrapper with timeout and standard error formatting
 */
export async function apiFetch<T = any>(
  endpoint: string,
  options: RequestInit & { token?: string } = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds timeout

    const response = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage =
        data?.error?.message ||
        data?.message ||
        `Terjadi kesalahan pada server (${response.status})`;
      return {
        success: false,
        error: {
          code: data?.error?.code || `HTTP_${response.status}`,
          message: errorMessage,
        },
      };
    }

    return {
      success: true,
      data: data?.data ?? data,
    };
  } catch (error: any) {
    if (error.name === 'AbortError') {
      return {
        success: false,
        error: {
          code: 'TIMEOUT_ERROR',
          message: 'Permintaan waktu habis (timeout). Silakan periksa koneksi internet Anda.',
        },
      };
    }

    return {
      success: false,
      error: {
        code: 'NETWORK_ERROR',
        message: error.message || 'Gagal terhubung ke server. Pastikan koneksi internet Anda aktif.',
      },
    };
  }
}
