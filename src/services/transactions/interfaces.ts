export interface TransactionRaw {
  id: number;
  name: string;
  amount: number;
  transactionDate: string;
  type: 'income' | 'expense';
  categoryId: number;
  source: 'account' | 'card';
  cardId?: number;
  accountId?: number;
  transferAccountId?: number;
  recurrenceDateRange?: string[];
}

export type TransactionsFormPayload = Omit<TransactionRaw, 'id'>;