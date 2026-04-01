import type { AxiosError } from 'axios';

export interface RegisterProps {
  switchAuthHandler: () => void;
}

export interface LoginProps {
  switchAuthHandler: () => void;
}

export interface LogoProps {
  text: string;
}

export interface inputProps {
  field: string;
  Label: string;
  value: string;
  onChangeHandler: (value: string, field: string) => void;
  type: string;
  showErrorMessage: boolean;
  validationMessage: string;
  onBlurHandler: (value: string, field: string) => void;
  textarea?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export type ApiErrorPayload = { message?: string };

export interface ErrorResponse {
  error: true;
  exception: AxiosError<ApiErrorPayload>;
}

// Assuming a successful login returns user details and a token
export interface LoginSuccessResponse {
  userDetails: {
    email: string;
    token: string;
    username: string;
  };
}

// Registration request payload
export interface RegisterData {
  email: string;
  username: string;
  password: string;
}

// Registration success response mirrors login response shape
export interface RegisterSuccessResponse {
  userDetails: {
    email: string;
    token: string;
    username: string;
  };
}

// with a specific structure. We'll define interfaces for its response.
export interface UserDetails {
  token: string;
  email: string;
  username: string;
}

export interface LoginResponse {
  error?: string;
  data?: {
    userDetails: UserDetails;
  };
}

export interface ChannelCardProps {
  title: string;
  username: string;
  isOnline: boolean;
  avatarUrl: string | null;
  navigateToChannelHandler: () => void;
}

export type ChannelDescriptionProps = {
  channelId?: string;
  username: string;
  title: string;
  description: string;
  getChannels?: () => void;
};

export type updatePasswordFormState = {
  password: {
    isValid: boolean;
    showError: boolean;
    value: string;
  };
  newPassword: {
    isValid: boolean;
    showError: boolean;
    value: string;
  };
};

export type InputDefinition = {
  field: keyof updatePasswordFormState;
  label: string;
  validationMessage: string;
  type: string;
};

export interface ChannelSettings {
  username: string;
  title: string;
  description: string;
  avatarUrl: string;
  streamKey?: string;
}

export type SaveSettingsData = Partial<
  Pick<ChannelSettings, 'username' | 'title' | 'description'>
>;

export interface ChangePasswordData {
  password: string;
  newPassword: string;
}

export interface ChangePasswordSuccessResponse {
  message: string;
}

export interface Channel {
  id: string;
  title: string;
  username: string;
  avatarUrl: string;
  isOnline: boolean;
  thumbnailUrl?: string;
}

export interface ChannelsState {
  channels: Channel[];
}

export type User = {
  username: string;
  email: string;
};

export type ChannelDetails = {
  [x: string]: string;
  id: string;
  title: string;
  description: string;
  username: string;
  isOnline: boolean;
  streamKey: string;
  followers?: User[];
};

export type FollowButtonProps = {
  channelId: string;
  getChannels: () => void;
};

export type FollowChannelResponse = {
  message: string;
};

export type FollowedChannelsResponse = {
  followedChannels: string[];
};
