import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { CategoriesListResponse, CategoryFormPayload } from './interface';

async function create ({ name } : CategoryFormPayload) {
  try {
    const { data } = await api.post('/categories', { name });
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function get (): Promise<CategoriesListResponse> {
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