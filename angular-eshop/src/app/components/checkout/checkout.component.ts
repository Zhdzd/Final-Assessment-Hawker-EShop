import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  form!: FormGroup;

  totalPrice:number= 0;
  totalQuantity:number = 0;

  creditCardYear: number[] = [];
  creditCardMonth: number[] = []


  constructor(private formBuilder: FormBuilder,
        private shopFormSvc: ShopFormService,
        private cartSvc: CartService,
        private checkoutSvc: CheckoutService,
        private router: Router) { }

  ngOnInit(): void {

    this.reviewCart();

    this.form = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('',[Validators.required,Validators.minLength(3)]),
        lastName: new FormControl('',[Validators.required,Validators.minLength(3)]),
        email: new FormControl('' , [Validators.required,Validators.minLength(3)])
      }),
      deliveryAddress: this.formBuilder.group({
        street: new FormControl('',[Validators.required,Validators.minLength(3)]),
        city: new FormControl('',[Validators.required,Validators.minLength(3)]),
        unitNumber:new FormControl('',[Validators.required]),
        postalCode:new FormControl('',[Validators.required])
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        unitNumber:[''],
        postalCode:['']
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('',[Validators.required]),
        nameOnCard:new FormControl('',[Validators.required]),
        cardNumber:new FormControl('',[Validators.required]),
        securityCode:new FormControl('',[Validators.required]),
        expirationMonth:[''],
        expirationYear:['']
      })

    });
    //to populate credit month
    const startMonth: number = new Date().getMonth() + 1;
    console.log(">>>start month " + startMonth);

    this.shopFormSvc.getMonth(startMonth).subscribe(
      data => {
        console.log("retrieved credit card month: " + JSON.stringify(data));
        this.creditCardMonth = data;

      }
    );

    //populat years
    this.shopFormSvc.getYear().subscribe(
      data => {
        console.log("retrieved credit card year: " + JSON.stringify(data));
        this.creditCardYear = data;

      }
    );
  }
  reviewCart() {
    //subcribing to cart service for total quantity and total price
    this.cartSvc.totalQuantity.subscribe(
        totalQuantity => this.totalQuantity = this.totalQuantity
    );

    this.cartSvc.totalPrice.subscribe(
       totalPrice => this.totalPrice = totalPrice
    );
  }

  //for error msgs if user never input the fields
  get firstName(){return this.form.get(`customer.firstName`);}
  get lastName(){return this.form.get(`customer.lastName`);}
  get email(){return this.form.get(`customer.email`);}

  get deliveryAddressStreet(){return this.form.get(`deliveryAddress.street`);}
  get deliveryAddressCity(){return this.form.get(`deliveryAddress.city`);}
  get deliveryAddressUnitNumber(){return this.form.get(`delivery.unitNumber`);}
  get deliveryAddressPostalCode(){return this.form.get(`deliveryAddress.postalCode`);}

   get creditCardType(){return this.form.get(`creditCard.cardType`);}
   get nameOnCard(){return this.form.get(`creditCard.nameOnCard`);}
   get cardNumber(){return this.form.get(`creditCard.cardNumber`);}
   get securityCode(){return this.form.get(`creditCard.securityCode`);}

  copyAddress(event: Event){
    const isChecked = (<HTMLInputElement>event.target).checked;

    if(isChecked){
      this.form.controls['billingAddress'].setValue(this.form.controls['deliveryAddress'].value);
    } else{
      this.form.controls['billingAddress'].reset();
    }

  }

  onSubmit(){
    console.log(">>>form submitted")
    console.log(this.form.get('customer').value);

    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }

    //configure order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    //get cart items
    const cartItems = this.cartSvc.cartItems

    //create orderitems from cart items
    let orderItems: OrderItem[]=[];
    for(let i=0; i<cartItems.length; i++){
      orderItems[i] = new OrderItem(cartItems[i]);
    }

    //set up purchase
    let purchase = new Purchase();

    //populate purchase -customer -- grabbing values from form
    purchase.customer = this.form.controls['customer'].value;

    //populate purchase - delivery add
    purchase.deliveryAddress = this.form.controls['deliveryAddress'].value;
    //populate purchase - billing add
    purchase.billingAddress = this.form.controls['billingAddress'].value;

    //populate purchase - order and orderitems
    purchase.order = order;
    purchase.orderItems = orderItems;

    //rest apis using checkout servce
    this.checkoutSvc.placeOrder(purchase).subscribe(
      {
        //successful
        next: response => {
          alert(`Order has been submitted successfully!. \nOrder tracking number: ${response.orderTrackingNumber}`)
          console.info('>>>tracking number:', response.orderTrackingNumber)

          //to reset cart
          this.resetCart();
        },
        error: err =>{
          alert(`ERROR, order was unsuccessful: ${err.message}`)
        }
      });
  }


  resetCart() {
    //rest cart info
    this.cartSvc.cartItems=[];
    this.cartSvc.totalPrice.next(0);
    this.cartSvc.totalQuantity.next(0);
    //reset form
    this.form.reset();

    //go back to product page
    this.router.navigateByUrl("/products");
  }
}
