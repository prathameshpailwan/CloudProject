import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private apiUrl = '/api/https://01.fy25ey01.64mb.io/';  // The provided API endpoint

  constructor(private http: HttpClient) { }

  getGridData(): Observable<any> {
    return this.http.get(this.apiUrl);  // Make GET request and type it as CloudResponse
  }
}
