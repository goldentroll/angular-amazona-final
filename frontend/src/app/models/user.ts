// export class User {
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
  // token: string;
  isAdmin: boolean;
}
export interface Credentials {
  email: string;
  password: string;
}

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  token: string;
}
export interface UserAuth {
  userInfo?: UserInfo;
  error: string;
}
