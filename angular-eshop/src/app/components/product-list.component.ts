import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../common/cart-item';
import { Product } from '../common/product';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!: Product[];
  currentCategoryId!: number;
  searchMode!: Boolean;

  constructor(private productListService: ProductService,
        private route:ActivatedRoute,
          private cartSvc: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(){
      this.searchMode = this.route.snapshot.paramMap.has('keyword');

      if(this.searchMode){
        this.handleSearchProducts();
      } else{
        this.handleListProducts();
      }

  }

  handleSearchProducts(){
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

      //searching products using keyword
      this.productListService.searchProducts(theKeyword).subscribe(
        data => {
          this.products = data;
        }
      )
  }

  handleListProducts(){
        //check if id param is avail
        const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

        if (hasCategoryId){
          //take id param string and convert to number using +
          this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
        } else {
          //if category not avail
          this.currentCategoryId = 1;
        }
        //get products for given category id
        this.productListService.getProductList(this.currentCategoryId).subscribe(
            data => {
              this.products = data;
            }
        )
      }

    addToCart(theProduct: Product){
        console.log(`Adding to cart : ${theProduct.name}, ${theProduct.price}`);


        const theCartItem = new CartItem(theProduct);

        this.cartSvc.addToCart(theCartItem);
    }
}
