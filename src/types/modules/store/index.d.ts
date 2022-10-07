export interface StoreModalState {
  modal: boolean;
}

export interface StoreUserState {
  userName: string;
  role: number;
  token: string;
}

export interface StoreLoginAction {
  userName: string;
  password: string;
}
