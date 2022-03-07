import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Hawker } from '../common/hawker';

@Injectable({
  providedIn: 'root'
})
export class HawkerListService {
  private url = "/api/location";

  constructor(private http: HttpClient) { }

  getHawkerList(): Observable<Hawker[]>{
      return this.http.get<Hawker[]>(this.url);
  }
}
