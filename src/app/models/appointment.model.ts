import { UserModel } from './user.model';

export interface AppointmentModel {
  id: number;
  title: string;
  description: string;
  date: Date;
  duration: number;
  location: string;
  invite: UserModel[];
}
export interface AppointmentResponse {
  success: boolean;
  message: string | null;
  data: AppointmentModel[];
}
