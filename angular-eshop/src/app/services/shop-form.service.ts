import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//adding month and year for credit card


@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

  getMonth(startMonth: number): Observable<number[]>{
    let data: number[] = [];

    //array for month
    for (let month = startMonth; month <= 12; month++){
      data.push(month);
    }
    return of(data);
  }

  getYear(): Observable<number[]>{
    let data: number[] = [];

    const start: number = new Date().getFullYear();
    const end: number = start + 10;

    for(let year = start; year <= end; year++ ){
        data.push(year);
    }
    return of(data);
  }
}
