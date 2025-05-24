const currency = (value: string) => {
  value = value.replace(/\D/g, '');

  return `R$ ${(+value / 100).toFixed(2).replace('.', ',')}`;
};

const date = (value: string) => {
  value = value.replace(/ /g, '/');

  value = value.replace(/[^\d/]/g, '');

  return value.slice(0, 10);
};

export const mask = {
  currency,
  date,
};