import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudService {
  private apiUrl = 'https://01.fy25ey01.64mb.io/';  // Use the full API URL
  //private apiUrl = 'assets/cloud.json'; 

  constructor(private http: HttpClient) { }

  getGridData(): Observable<any> {
    return this.http.get(this.apiUrl); 
  }

  //fetch through json
   /*  getGridData(): Observable<any> {
      debugger
      return this.http.get<any>(this.apiUrl);
    } */
}
