import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public geoapifyGet(path: string, text: string) {
    return this.http.get(`${environment.GEOAPIFY_BASE_URL}/${path}`, {
      params: {
        text,
        apiKey: environment.GEOAPIFY_API_KEY,
      },
    });
  }
}
