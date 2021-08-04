export interface Librarian {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  registerDate: Date;
  currentRefreshToken: string;
  isActive: boolean;
}

export interface AccessToken{
  token_info: string;
  expireIn: string;
}

export interface RegisterLibDto {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  role: string;    //admin or librarian
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface UpdateLibDto {
  username: string;
  email: string;
  role: string;    //admin or librarian
  firstName: string;
  lastName: string;
  phoneNumber: string;
  isActive: string;
}

export interface ChangePwdDto{
  username: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface OperationLogDto {
  operator: string;
  time: string;
  operation: string;
  details: string;
}