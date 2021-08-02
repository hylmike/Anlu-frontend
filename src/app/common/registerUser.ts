export class RegisterUser {
  username!: string;
  password!: string;
  confirmPassword!: string;
  email!: string;
  firstName: string | undefined;
  lastName: string | undefined;
  gender: string | undefined;
  birthday: Date | undefined;
  phoneNumber: string | undefined;
  address: string | undefined;
  postcode: string | undefined;
  securityQuestion!: string;
  securityAnswer!: string;
}