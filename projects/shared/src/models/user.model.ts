export interface UserModel {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    displayName: string;
    role: string;
}

export interface LoginCredentials {
    username: string;
    password: string;
    type: string;
  }