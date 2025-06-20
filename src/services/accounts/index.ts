import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { AccountFormPayload, AccountRaw, UpdateAccountPayload } from './interface';

async function create (data: AccountFormPayload) {
  try {
    const { data: response } = await api.post('/accounts', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function update (data: UpdateAccountPayload) {
  try {
    const { data: response } = await api.patch('/accounts', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function get (): Promise<AccountRaw[]> {
  try {
    const { data } = await api.get('/accounts');
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function remove (accountId: number) {
  try {
    await api.delete(`/accounts/${accountId}`);
  } catch (err) {
    handlerAxiosError(err);
  }
}

export const accountsApi = {
  create,
  update,
  get,
  remove,
};