// CheckUserName 接口
export interface RequestCheckUserName {
  userName: string;
}

// Register 接口
export interface RequestRegister {
  userName: string;
  password: string;
}

// Login 接口
export interface RequestLogin {
  userName: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
  loginTime: string;
}
