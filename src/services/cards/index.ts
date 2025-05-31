import { api } from '@services/api';
import { handlerAxiosError } from '@utils/axiosError';

import { CardFormPayload, CardRaw, UpdateCardPayload } from './interface';

async function create (data: CardFormPayload) {
  try {
    const { data: response } = await api.post('/cards', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function update (data: UpdateCardPayload) {
  try {
    const { data: response } = await api.patch('/cards', data);
    return response.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

async function get (): Promise<CardRaw[]> {
  try {
    const { data } = await api.get('/cards');
    return data.resource;
  } catch (err) {
    handlerAxiosError(err);
  }
}

export const cardsApi = {
  create,
  update,
  get,
};