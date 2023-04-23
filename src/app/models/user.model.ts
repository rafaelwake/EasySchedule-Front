export interface UserModel {
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
