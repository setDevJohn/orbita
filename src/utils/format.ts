const currencyToDecimal = (value: string) => {
  value = value.replace(/\D/g, '');

  return Number(value) / 100;
};

export const format = {
  currencyToDecimal
};