export interface UserBase {
  id: number;
  name: string;
  email: string;
  verified: boolean | null;  
  cellPhone: string | null,
  wage: string | null,
  payday: string | null,
}

export type UserFormLogin = {
  email: string,
  password: string
}

export type UserFormPayload = {
  name: string
  email: string
  password: string  
}

export type UserRegisterResponse = { 
  id: number,
  email: string
}
