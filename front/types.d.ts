export interface RegisterMutation {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  password: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  phoneNumber: string;
  password: string;
  token: string;
}

export interface GlobalError {
  error: string
}