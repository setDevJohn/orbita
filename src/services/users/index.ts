import { TokenData } from '@context/Home/interface';
import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { UpdatePasswordForm, UpdateUserPayload, UserBase, UserFormLogin, UserFormPayload, UserRegisterResponse } from './interface';

async function login(data: UserFormLogin): Promise<void> {
  try {
    await api.post('/users/auth', data);
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function register(data: UserFormPayload): Promise<UserRegisterResponse> {
  try {
    const { data: response } = await api.post('/users', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function logout(): Promise<void> {
  try {
    await api.post('/users/logout');
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function verify(): Promise<TokenData> {
  try {
    const { data: response } = await api.get('/users/verify');
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function sendEmailToRecoverPassword (email: string): Promise<{ id: number }> {
  try {
    const { data: response } = await api.post(
      '/users/password-recovery/send-email',
      { email }
    );
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function confirmTokenToRecoverPassword (userId: number, token: string): Promise<void> {
  try {
    await api.post('/users/password-recovery/confirm-token', { userId, token });
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function recoverPassword (userId: number, password: string, token: string): Promise<void> {
  try {
    await api.patch('/users/password-recovery', { userId, password, token });
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function update(data: UpdateUserPayload): Promise<UserBase> {
  try {
    const { data: response } = await api.put('/users', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function updatePassword(formData: UpdatePasswordForm): Promise<void> {
  try {
    await api.patch('/users/update-password', formData);
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function findInfo(): Promise<UserBase> {
  try {
    const { data: response } = await api.get('/users/info');
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function updateProfileImage(formData: FormData): Promise<void> {
  try {
    const { data: response } = await api.put('/users/update-profile-image', formData);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

export const usersApi = {
  login,
  register,
  verify,
  logout,
  sendEmailToRecoverPassword,
  confirmTokenToRecoverPassword,
  recoverPassword,
  update,
  updatePassword,
  findInfo,
  updateProfileImage,
};