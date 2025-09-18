export interface TransactionRaw {
  id: number,
  name: string,
  type: 'income' | 'expense',
  amount: string,
  transactionDate: Date,
  source: 'account' | 'card',
  referenceMonth: number,
  referenceYear: number,
  currenInstallment: number | null,
  totalInstallments: number | null,
  categories: {
    id: number
    name: string
  } | null,
  accounts: {
    id: number,
    name: string,
    balance: string | null
  } | null,
  cards: {
    id: number,
    name: string,
    creditLimit: string | null,
    closingDay: number,
    dueDay: number,
  } | null
}

export interface TransactionsFormPayload {
  name: string;
  type: 'income' | 'expense';
  amount: number;
  transactionDate: string;
  source: 'account' | 'card';
  referenceMonth?: number;
  referenceYear?: number;
  currenInstallment?: number | null; // Se for "current", pode ajustar o nome
  totalInstallments?: number | null;
  categoryId?: number;
  accountId?: number;
  cardId?: number;
  recurrenceDateType?: string;
  recurrenceDateRange?: string[];
}
