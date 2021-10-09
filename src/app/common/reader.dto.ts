export interface ReaderProfile {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: Date;
  phoneNumber: string;
  address: {
    homeAddress: string;
    province: string;
    postcode: string;
  };
  readTimes: number;
  readDuration: number;
  score: number;
  securityQuestion: string;
  securityAnswer: string;
}

export interface ReaderReadHistory {
  _id: string;
  bookID: string;
  currentPage: number;
  startTime: Date;
  lastReadTime: Date;
  readTimes: number;
  readDuration: number;
}

export interface Reader {
  _id: string;
  username: string;
  password: string;
  email: string;
  isActive: boolean;
  registerDate: Date;
  currentRefreshToken: string;
  favouriteBook: [{ bookID: string; createDate: Date }];
  readerProfile: ReaderProfile;
  readHistory: [ReaderReadHistory];
}

export interface AccessToken{
  token_info: string;
  expireIn: string;
}

export interface RegisterReaderDto {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  phoneNumber: string;
  homeAddress: string;
  province: string;
  postcode: string;
  securityQuestion: string;
  securityAnswer: string;
}

export interface ChangePwdDto{
  username: string;
  currentPassword: string;
  newPassword: string;
}

export interface UpdateReaderDto {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  phoneNumber: string;
  homeAddress: string;
  province: string;
  postcode: string;
  securityQuestion: string;
  securityAnswer: string;
}

export interface FavorBookDto {
  bookID: string;
}

export interface ResetPwdDto {
  username: string;
  token: string;
  newPassword: string;
}

export interface emailDto {
  email: string;
}

