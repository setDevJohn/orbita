import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { UserFormLogin, UserFormPayload } from './interface';

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

export const usersApi = {
  login,
  register,
};