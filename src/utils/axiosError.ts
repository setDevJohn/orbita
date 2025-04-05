import axios from 'axios';

export function handleAxiosError (error: unknown): string {
  if (axios.isAxiosError(error) && !error.response) {
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
