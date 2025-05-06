export type EventType = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  nbr_reserved: string;
  capacity: string;
  user: string;
  isBooking?: boolean;
}