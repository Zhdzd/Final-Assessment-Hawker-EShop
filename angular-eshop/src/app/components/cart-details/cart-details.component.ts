import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {


  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;


  constructor(private cartSvc: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {

    //get a handle to the cart items
    this.cartItems = this.cartSvc.cartItems;

    //subscribe to the cart totalprice
    this.cartSvc.totalPrice.subscribe(
        data => this.totalPrice = data
    );

    //subscribe to the cart totalQuantity
    this.cartSvc.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    //compute cart total price and quantity
    this.cartSvc.computeCartTotals();
  }

  incrementQuantity(theCartItem : CartItem){
    this.cartSvc.addToCart(theCartItem)
  }
  decrementQuantity(theCartItem: CartItem){
      this.cartSvc.decrementQuantity(theCartItem);
  }
  remove(theCartItem: CartItem){
    this.cartSvc.remove(theCartItem);

  }

}
