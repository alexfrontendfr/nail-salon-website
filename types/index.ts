import { DatePickerProps as ReactDatePickerProps } from "react-datepicker";

export type DatePickerProps = ReactDatePickerProps;

export interface Service {
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
}

export interface TimeSlot {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  available: boolean;
}

export interface Appointment {
  id?: number;
  created_at?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time_slot_id: number;
}
