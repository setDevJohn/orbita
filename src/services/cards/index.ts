import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { CardFormPayload, ICardsResponse } from './interface';

async function create (data: CardFormPayload) {
  try {
    const { data: response } = await api.post('/cards', data);
    return response.resource;
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