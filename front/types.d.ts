
export interface LoginMutation {
    email: string;
    password: string;
}

export interface GlobalError {
    error: string
}

export interface User {
    _id: string;
    firstName: string,
    lastName: string,
    token: string,
    email: string,
    phoneNumber: string,
    country: string
}

export interface UserResponse {
    message: string;
    user: User

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