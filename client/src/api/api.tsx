import axios, { isAxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import type {
  ChangePasswordData,
  ChangePasswordSuccessResponse,
  LoginData,
  ErrorResponse,
  LoginSuccessResponse,
  RegisterData,
  RegisterSuccessResponse,
  ChannelSettings,
  FollowedChannelsResponse,
  FollowChannelResponse,
} from '../types/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5002/api',
  timeout: 10000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem('user');

    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const login = async (
  data: LoginData
): Promise<AxiosResponse<LoginSuccessResponse> | ErrorResponse> => {
  try {
    return await apiClient.post<LoginSuccessResponse>('/auth/login', data);
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    // If it's not an Axios error, create a generic one to match the type
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};

export const register = async (
  data: RegisterData
): Promise<AxiosResponse<RegisterSuccessResponse> | ErrorResponse> => {
  try {
    return await apiClient.post<RegisterSuccessResponse>(
      '/auth/register',
      data
    );
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};

export const getChannelSettings = async (): Promise<
  AxiosResponse<ChannelSettings> | ErrorResponse
> => {
  try {
    return await apiClient.get<ChannelSettings>('/settings/channel');
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};

export const updateChannelSettings = async (
  data: Partial<ChannelSettings>
): Promise<AxiosResponse<ChannelSettings> | ErrorResponse> => {
  try {
    return await apiClient.put<ChannelSettings>('/settings/channel', data);
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};

export const changePassword = async (
  data: ChangePasswordData
): Promise<AxiosResponse<ChangePasswordSuccessResponse> | ErrorResponse> => {
  try {
    return await apiClient.patch<ChangePasswordSuccessResponse>(
      '/settings/password',
      data
    );
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};

export const getFollowedChannels = async (): Promise<
  AxiosResponse<FollowedChannelsResponse> | ErrorResponse
> => {
  try {
    return await apiClient.get<FollowedChannelsResponse>('/channels/followed');
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};

export const getChannels = async () => {
  try {
    return await apiClient.get('/channels');
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};

export const getChannelDetails = async (channelId: string) => {
  try {
    return await apiClient.get(`/channels/${channelId}`);
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};

export const followChannel = async (
  channelId: string
): Promise<AxiosResponse<FollowChannelResponse> | ErrorResponse> => {
  try {
    return await apiClient.post<FollowChannelResponse>('/channels/follow', {
      channelId,
    });
  } catch (exception) {
    if (isAxiosError(exception)) {
      return {
        error: true,
        exception: exception as ErrorResponse['exception'],
      };
    }
    const genericError = new axios.AxiosError('An unexpected error occurred.');
    return {
      error: true,
      exception: genericError as ErrorResponse['exception'],
    };
  }
};
