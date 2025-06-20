export interface AccountRaw {
  id: number;
  name: string;
  balance: string;
}

export interface AccountBase {
  id: number;
  name: string;
  balance: number;
}

export type AccountFormPayload = Omit<AccountBase, 'id'>

export type UpdateAccountPayload = AccountBase