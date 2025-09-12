const currencyToDecimal = (value: string) => {
  value = value.replace(/\D/g, '');

  return Number(value) / 100;
};

const dateToDayAndMonth = (value: Date | string) => {
  const date = value.toString().split('T')[0];
  const dayAndMonth = date.split('-').reverse().slice(0, 2).join('/');
  return dayAndMonth;
};

const extractNumberOfCellPhone = (value: string) => value.replace(/\D/g, '');

export const format = {
  currencyToDecimal,
  dateToDayAndMonth,
  extractNumberOfCellPhone,
};