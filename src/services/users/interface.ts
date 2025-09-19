export interface UserBase {
  name: string;
  email: string;
  profileImage: string | null;
  verified: boolean | null;  
  cellPhone: string | null,
  wage: number | null,
  payday: number | null,
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

export type UpdateUserPayload = Omit<UserBase, 'verified' | 'profileImage'>

export type UpdatePasswordForm = { 
  currentPassword: string,
  newPassword: string
}

export interface UserSettings {
  currency?: 'BRL',
  transactionPosting?: 'sameDay' | 'afterClosing'
  pushNotifications?: boolean,
  smsNotifications?: boolean,
  mailNotifications?: boolean,
}