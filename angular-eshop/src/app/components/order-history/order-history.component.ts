import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  userHistory: OrderHistory[] =[];

  storage: Storage = sessionStorage;


  constructor(private histSvc: OrderHistoryService) { }

  ngOnInit(): void {
    this.handleUserHistory();
  }

  handleUserHistory() {
    const userEmail = JSON.parse(this.storage.getItem('userEmail'));

    this.histSvc.getOrderHistory(userEmail).subscribe(
       data => {

          //this.userHistory = data._embedded.orders['orderItems'];
          this.userHistory = data._embedded.orders;
         console.info('>>> user history', this.userHistory)
       }
   );





  }

}
