import { UserModel } from './user.model';

export interface AppointmentModel {
  id: number;
  title: string;
  description: string;
  date: Date;
  time: string;
  duration: number;
  location: string;
  participant: UserModel[];
}
