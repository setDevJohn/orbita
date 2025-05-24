interface CardRaw {
  id: number;
  name: string;
  creditLimit: number;
  closingDay: number;
  dueDay: number; 
}

export type CardFormPayload = Omit<CardRaw, 'id'>

export interface ICardsResponse {
  id: number;
  name: string;
  creditLimit: number ;
  closingDay: number;
  dueday: number; 
}