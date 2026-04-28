export interface registerUser {
  name: string;
  email: string;
  password: string;
}

export interface userResonse {
  id?:string
  _id?:string
  name: string;
  email: string;
  password: string;
  provider?: string;
  otpExpiredAt?: number;
  isVerified?: boolean;
  otp?: number;
  createdAt?: string;
  updatedAt: string;
  save?: () => Promise<userResonse>;
}

export interface requestBody {
  email: string;
  password?: string;
}

export interface resetPasswordType{
    token:string,
    newPassword:string
}
