export interface CardRaw {
  id: number;
  name: string;
  creditLimit: number;
  closingDay: number;
  dueDay: number; 
}

export type CardFormPayload = Omit<CardRaw, 'id'>

export type UpdateCardPayload = CardRaw;