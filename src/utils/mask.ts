const currency = (value: string) => {
  value = value.replace(/\D/g, '');

  return `R$ ${(+value / 100).toFixed(2).replace('.', ',')}`;
};

const currencyToDecimal = (value: string) => {
  value = value.replace(/\D/g, '');

  return Number(value) / 100;
};

const date = (value: string) => {
  value = value.replace(/ /g, '/');

  value = value.replace(/[^\d/]/g, '');

  return value.slice(0, 11);
};

export const mask = {
  currency,
  currencyToDecimal,
  date,
};