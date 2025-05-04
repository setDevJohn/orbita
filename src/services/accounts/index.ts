import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

async function create () {
  try {
    const { data } = await api.post('/accounts');
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function get (): Promise<any[]> {
  try {
    const { data } = await api.get('/accounts');
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

export const accountsApi = {
  create,
  get,
};