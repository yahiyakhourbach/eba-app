export type EventManageType = {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: { lat: number; lng: number };
  nbr_reserved?: string;
  user: string;
  country: string;
  city: string;
  street: string;
  zipcode: number;
  capacity: number;
};

export type EventManageTypeVariables = {
  title: string;
  description: string;
  date: Date;
  location: { lat: number; lng: number };
  capacity: number;
  country: string;
  city: string;
  street: string;
  zipcode: number;
};

export type UpdateEventManageTypeVariables = {
  title: string;
  description: string;
  date: Date;
  location: { lat: number; lng: number };
  capacity: string;
  country: string;
  city: string;
  street: string;
  zipcode: number;
};
