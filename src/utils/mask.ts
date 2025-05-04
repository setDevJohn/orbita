const currency = (value: string) => {
  value = value.replace(/\D/g, '');

  return `R$ ${(+value / 100).toFixed(2).replace('.', ',')}`;
};

const currencyToDecimal = (value: string) => {
  value = value.replace(/\D/g, '');

  return Number(value) / 100;
};

export const mask = {
  currency,
  currencyToDecimal
};