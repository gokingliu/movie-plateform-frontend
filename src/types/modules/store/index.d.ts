export interface StoreUserState {
  username: string;
  role: number;
  token: string;
}

export interface StoreLoginAction {
  username: string;
  password: string;
}
