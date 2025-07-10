import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { CategoriesListResponse, CategoryFormPayload } from './interface';

async function create (data : CategoryFormPayload) {
  try {
    const { data: response } = await api.post('/categories', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function update (data : CategoryFormPayload) {
  try {
    const { data: response } = await api.patch('/categories', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function remove (categoryId: number) {
  try {
    await api.delete(`/categories/${categoryId}`);
  } catch (err) {
    console.error(err);
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
  update,
  remove,
  get,
};