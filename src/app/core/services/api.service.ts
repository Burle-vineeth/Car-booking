import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public geoapifyGet(path: string, paramsPayload: Record<string, string>) {
    return this.http.get(`${environment.GEOAPIFY_BASE_URL}/${path}`, {
      params: {
        ...paramsPayload,
        apiKey: environment.GEOAPIFY_API_KEY,
      },
    });
  }
}
