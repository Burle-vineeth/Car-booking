export interface GeoPlace {
  name: string;
  formatted: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
  city?: string;
  type: string;
}
