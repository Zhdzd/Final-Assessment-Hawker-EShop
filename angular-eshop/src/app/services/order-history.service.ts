import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  //private userHistoryUrl = 'http://localhost:8080/api/orders';
  private userHistoryUrl = '/api/orders';


  constructor(private http: HttpClient) { }

  // getOrderHistory(theEmail: string): Observable<GetResponseUserHistory>{

  //   const userHistoryUrl = `${this.userHistoryUrl}/search/findByCustomerEmail?email=${theEmail}`;
  //   console.info('>>>> email', theEmail)
  //   return this.http.get<GetResponseUserHistory>(userHistoryUrl);

  // }
  getOrderHistory(theEmail: string): Observable<GetResponseUserHistory>{

    const userHistoryUrl = `${this.userHistoryUrl}/search/findByCustomerEmail?email=${theEmail}`;
    console.info('>>>> email', theEmail)
    return this.http.get<GetResponseUserHistory>(userHistoryUrl);


  }
}

interface GetResponseUserHistory {
  _embedded: {
    orders: OrderHistory[];
      //  orders: [
      //           orderItems : OrderHistory[]
      // ]

  }
}
