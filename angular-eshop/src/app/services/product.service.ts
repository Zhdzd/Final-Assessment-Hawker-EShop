import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

    //private baseUrl = 'http://localhost:8080/api/products';
    //private categoryUrl = 'http://localhost:8080/api/product-category';

    private baseUrl = '/api/products';
    private categoryUrl = '/api/product-category';




    constructor(private httpClient: HttpClient){}

    getProduct(theProductId: number): Observable<Product>{
      const productUrl = `${this.baseUrl}/${theProductId}`;

      return this.httpClient.get<Product>(productUrl);
    }


    getProductList(theCategoryId: number): Observable<Product[]>{
    //build url based on category id
    //to enable page to switch between categories (using category id)
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

      return this.getProducts(searchUrl);
    }

    getProductCategories(): Observable<ProductCategory[]>{
      return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
    );
    }

     searchProducts(theKeyword:string): Observable<Product[]>{
      //build url based on keyword
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

      return this.getProducts(searchUrl);
     }

  //method returning products - used for searchProducts and getProductList
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
