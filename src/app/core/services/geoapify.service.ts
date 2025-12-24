import { GeoapifyRoutes } from '@/shared/constants';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GeoPlace, Route } from '../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GeoapifyService {
  private apiService = inject(ApiService);

  public async getAutoCompletePlaces(text: string): Promise<GeoPlace[]> {
    try {
      const geoPlacesRes = await firstValueFrom<any>(
        this.apiService.geoapifyGet(GeoapifyRoutes.GEOCODE_AUTOCOMPLETE, { text }),
      );

      return geoPlacesRes.features.map((f: any) => ({
        name:
          f.properties.city || f.properties.state || f.properties.county || f.properties.formatted,

        formatted: f.properties.formatted,
        lat: f.properties.lat,
        lon: f.properties.lon,
        country: f.properties.country,
        state: f.properties.state,
        city: f.properties.city,
        type: f.properties.result_type,
      }));
    } catch (error) {
      throw error;
    }
  }

  public async getRouteDistance(pickup: GeoPlace, drop: GeoPlace) {
    try {
      const waypoints = `${pickup.lat},${pickup.lon}|${drop.lat},${drop.lon}`;
      const routingRes = await firstValueFrom<any>(
        this.apiService.geoapifyGet(GeoapifyRoutes.ROUTING, {
          waypoints,
          mode: 'drive',
        }),
      );

      return this.transformRoute(routingRes);
    } catch (error) {
      throw error;
    }
  }

  private transformRoute(res: any): Route | null {
    const feature = res?.features?.[0];
    if (!feature) return null;

    const props = feature.properties;
    const leg = props?.legs?.[0];

    return {
      mode: props.mode,
      units: props.units,

      summary: {
        distance_m: props.distance,
        distance_km: +(props.distance / 1000).toFixed(2),
        duration_s: props.time,
        duration_min: +(props.time / 60).toFixed(1),
      },

      waypoints: props.waypoints.map((wp: any, index: number) => ({
        lat: wp.location[1],
        lon: wp.location[0],
        index,
      })),

      steps:
        leg?.steps?.map((step: any) => ({
          instruction: step.instruction?.text,
          distance_m: step.distance,
          duration_s: Math.round(step.time),
        })) ?? [],

      path: feature.geometry.coordinates.flat(),
    };
  }
}
