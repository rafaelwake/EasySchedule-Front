export interface UserModel {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

export interface SessionModel {
  id: string;
  user: UserModel;
  token: string;
  createdAt: Date;
}
