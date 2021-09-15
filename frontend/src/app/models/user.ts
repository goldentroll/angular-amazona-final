﻿// export class User {
//     id: number;
//     username: string;
//     password: string;
//     firstName: string;
//     lastName: string;
//     token?: string;
// }
export interface User {
  _id: string;
  name: string;
  token: string;
}
export interface Credentials {
  email: string;
  password: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  isAdmin: boolean;
  token: string;
}
export interface UserAuth {
  userInfo?: UserInfo;
  error: string;
}
