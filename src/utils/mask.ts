const currency = (value: string) => {
  value = value.replace(/\D/g, '');

  return `R$ ${(+value / 100).toFixed(2).replace('.', ',')}`;
};

const brlCurrency = (value: string): string => {
  value = value.replace(/[^\d.-]/g, '');

  const numericValue = parseFloat(value);

  return numericValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

const date = (value: string) => {
  value = value.replace(/ /g, '/');

  value = value.replace(/[^\d/]/g, '');

  return value.slice(0, 10);
};

export const mask = {
  currency,
  brlCurrency,
  date,
};