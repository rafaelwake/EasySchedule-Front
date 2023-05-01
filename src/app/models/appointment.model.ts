import { UserModel } from './user.model';

export interface AppointmentModel {
  id?: number;
  title: string;
  description: string;
  date: Date;
  duration: number;
  location: string;
  invite?: string;
}
