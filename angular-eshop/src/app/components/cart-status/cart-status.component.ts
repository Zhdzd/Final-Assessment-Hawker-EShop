import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
      this.updateCartStatus();
  }

  updateCartStatus() {
      //subscribe to the cart for total price
      this.cartSvc.totalPrice.subscribe(
        data=> this.totalPrice = data
      );

      //subscribe for total quantity
      this.cartSvc.totalQuantity.subscribe(
        data =>this.totalQuantity = data
      );
  }

}
