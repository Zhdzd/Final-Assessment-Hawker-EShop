import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

    cartItems: CartItem[] = [];

    totalPrice: Subject<number> = new BehaviorSubject<number>(0);
    totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem){
    //check if  item in cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){
      //find item in cart based in id

      for(let c of this.cartItems){
        if(c.id === theCartItem.id){
          existingCartItem = c;
          break;
        }
      }
    //check if can find item
    alreadyExistsInCart = (existingCartItem != undefined);
    }
    if (alreadyExistsInCart){
      existingCartItem.quantity++
    } else{
      //just add item in array
      this.cartItems.push(theCartItem);
    }
    //calculate cart total price and quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
      let totalPriceValue: number = 0;
      let totalQuantityValue: number = 0;

      for(let c of this.cartItems){
          totalPriceValue +=c.quantity * c.unitPrice;
          totalQuantityValue += c.quantity;
      }
      //publish new vlaues
      this.totalPrice.next(totalPriceValue);
      this.totalQuantity.next(totalQuantityValue);

      this.logCartData(totalPriceValue,totalQuantityValue)
  }
  logCartData(totalPriceValue: number, totalQuantityValue: number) {
        console.log('Contents of cart');
        for(let c of this.cartItems){
          const subTotalPrice = c.quantity * c.unitPrice;
          console.log(`name: ${c.name}, quantity=${c.quantity},
                  unitPrice=${c.unitPrice}, subTotalPrice=${subTotalPrice}`);
        }
        console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
        console.log('---')
  }

  decrementQuantity(theCartItem: CartItem){
    theCartItem.quantity--;
    if(theCartItem.quantity === 0){
      this.remove(theCartItem)
    }else{
      this.computeCartTotals();
    }
  }
  remove(theCartItem: CartItem){

    //finding index of item in array
    const itemIndex = this.cartItems.findIndex(
        item => item.id == theCartItem.id);
    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);

      this.computeCartTotals();
    }
  }
}
