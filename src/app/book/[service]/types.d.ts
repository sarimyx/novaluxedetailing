export type AvailabilitySlot = {
  year: number;
  month: number;
  day: number;
  weekday: string;
  times: string[];
};

export type CustomerDetails = {
  name: string;
  phone: string;
  address: string;
  vehicle: string;
  email: string;
};
