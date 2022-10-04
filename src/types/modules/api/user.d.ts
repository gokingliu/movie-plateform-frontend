// CheckUserName 接口
export interface RequestCheckUserName {
  username: string;
}

// Register 接口
export interface RequestRegister {
  username: string;
  password: string;
}

// Login 接口
export interface RequestLogin {
  username: string;
  password: string;
}

export interface ResponseLogin {
  token: string;
  loginTime: string;
}
