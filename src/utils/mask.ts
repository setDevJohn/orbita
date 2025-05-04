const currency = (value: string) => {
  value = value.replace(/\D/g, '');

  return `R$ ${(+value / 100).toFixed(2).replace('.', ',')}`;
};

export const mask = {
  currency,
};