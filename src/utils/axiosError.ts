import axios, { AxiosError } from 'axios';

function axiosMessage (error: unknown): string {
  if (axios.isAxiosError(error)) {
    switch (error.code) {
      case 'ERR_NETWORK':
        return 'Não foi possível conectar ao servidor.';
      case 'ECONNABORTED':
        return 'O tempo de resposta do servidor expirou.';
      case 'ERR_UNKNOWN':
        return 'Ocorreu um erro inesperado.';
      default:
        return `Erro inesperado: ${error.message}`;
    }
  }

  return 'Erro desconhecido. Por favor, tente novamente.';
}

export function handlerAxiosError (error: unknown): never {
  if (error instanceof AxiosError) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(axiosMessage(error));
    }
  } else {
    throw new Error('Erro desconhecido. Por favor, tente novamente.');
  }
}