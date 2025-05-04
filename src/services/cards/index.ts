import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { ICardsResponse } from './interface';

async function create () {
  try {
    const { data } = await api.post('/cards');
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function get (): Promise<ICardsResponse[]> {
  try {
    const { data } = await api.get('/cards');
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

export const cardsApi = {
  create,
  get,
};