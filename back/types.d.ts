export interface User {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  password: string;
  avatar: string;
  token: string;
}

export interface ValidationError {
  property: string;
  value: string;
  constraints: ErrorMessages;
}

export interface ErrorMessages {
  [key: string]: string;
}
