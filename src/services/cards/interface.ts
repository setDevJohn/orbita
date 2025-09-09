export interface CardRaw {
  id: number;
  name: string;
  creditLimit: number;
  closingDay: number;
  dueDay: number; 
  invoice: number;
  availableCreditLimit: number
}

export type CardFormPayload = Omit<CardRaw, 'id' | 'invoice' | 'availableCreditLimit'>

export type UpdateCardPayload = Omit<CardRaw, 'invoice' | 'availableCreditLimit'>