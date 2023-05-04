export type User = {
  _id: string;
  username: string;
};

export type ViewState = {
  longitude: number;
  latitude: number;
  zoom: number;
};

export type Pin = {
  _id: string;
  username: string;
  place: string;
  review: string;
  rating: number;
  lat: number;
  lng: number;
  createdAt: Date;
  updatedAt: Date;
};

export type NewPin = {
  username: string;
  place: string;
  review: string;
  rating: number;
  lat: number;
  lng: number;
};

export type NewCoordinate = {
  lng: number;
  lat: number;
};
