import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { UserBase, UserFormLogin, UserFormPayload } from './interface';

async function login (data: UserFormLogin) {
  try {
    const { data: response } = await api.post('/users/auth', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function register (data: UserFormPayload) {
  try {
    const { data: response } = await api.post('/users', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function logout () {
  try {
    const { data: response } = await api.post('/users/logout');
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function verify () {
  try {
    const { data: response } = await api.get('/users/verify');
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function sendEmailToRecoverPassword (email: string): Promise<UserBase> {
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

async function confirmTokenToRecoverPassword (userId: number, token: string): Promise<UserBase> {
  try {
    const { data: response } = await api.post(
      '/users/password-recovery/confirm-token',
      { userId, token }
    );
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function recoverPassword (userId: number, password: string, token: string): Promise<UserBase> {
  try {
    const { data: response } = await api.patch(
      '/users/password-recovery',
      { userId, password, token }
    );
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
  recoverPassword
};