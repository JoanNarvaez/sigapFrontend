import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private http = inject(HttpClient);

  downloadAllData() {
    return this.http.get('http://localhost:8080/download/all-data', {
      responseType: 'blob',
    });
  }
}
