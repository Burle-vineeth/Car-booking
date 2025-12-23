import { GeoapifyRoutes } from '@/shared/constants';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { GeoPlace } from '../types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class GeoapifyService {
  private apiService = inject(ApiService);

  public async getAutoCompletePlaces(text: string): Promise<GeoPlace[]> {
    try {
      const geoPlacesRes = await firstValueFrom<any>(
        this.apiService.geoapifyGet(GeoapifyRoutes.GEOCODE_AUTOCOMPLETE, text),
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
}
