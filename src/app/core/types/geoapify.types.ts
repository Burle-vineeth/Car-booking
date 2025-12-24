type LatLng = [number, number];

interface RouteSummary {
  distance_m: number;
  distance_km: number;
  duration_s: number;
  duration_min: number;
}

interface RouteWaypoint {
  lat: number;
  lon: number;
  index: number;
}

interface RouteStep {
  instruction: string;
  distance_m: number;
  duration_s: number;
}

export interface Route {
  mode: 'drive';
  units: 'metric';
  summary: RouteSummary;
  waypoints: RouteWaypoint[];
  steps: RouteStep[];
  path: LatLng[];
}

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
