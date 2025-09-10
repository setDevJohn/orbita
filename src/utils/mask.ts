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

const phone = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (!digits.length) { return digits; }

  if (digits.length <= 2) { return `(${digits}`; }
  if (digits.length <= 7) { return `(${digits.slice(0, 2)}) ${digits.slice(2)}`; }
  if (digits.length <= 11) { return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`; }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
};

const dayOfMonth = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  console.log(digits);
  if (digits === '') { return ''; }

  let day = parseInt(digits, 10);

  if (day > 31) { day = 31; }

  return day.toString().padStart(2, '0');
};

const name = (value: string): string => {
  // Remove tudo que não for letra ou espaço
  const onlyLetters = value.replace(/[^A-Za-zÀ-ÿ\s]/g, '');

  // Remove espaços múltiplos e trim
  const cleaned = onlyLetters.replace(/\s+/g, ' ');

  const lowerCaseWords = ['de', 'da', 'do', 'dos', 'das', 'e'];

  const words = cleaned.split(' ');

  const formattedWords = words.map((word, index) => {
    const lower = word.toLowerCase();

    // Se for pronome e não for a primeira palavra, deixa minúsculo
    if (lowerCaseWords.includes(lower) && index !== 0) {
      return lower;
    }

    // Capitaliza
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  });

  return formattedWords.join(' ');
};

export const mask = {
  currency,
  brlCurrency,
  date,
  phone,
  dayOfMonth,
  name
};