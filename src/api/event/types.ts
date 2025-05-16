export type EventType = {
  id: number;
  title: string;
  description: string;
  date: string;
  location: { lat: number; lng: number };
  nbr_reserved: string;
  capacity: string;
  user: string;
  country: string;
  city: string;
  street: string;
  zipcode: string;
  isBooking?: boolean;
};
