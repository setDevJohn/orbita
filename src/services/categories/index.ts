import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { ICategoriesResponse } from './interface';

async function create () {
  try {
    const { data } = await api.post('/categories');
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function get (): Promise<ICategoriesResponse[]> {
  try {
    const { data } = await api.get('/categories');
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

export const categoriesApi = {
  create,
  get,
};