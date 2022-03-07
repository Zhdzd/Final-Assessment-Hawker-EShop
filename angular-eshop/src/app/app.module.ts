import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartService } from './services/cart.service';
import { CheckoutService } from './services/checkout.service';
import { ShopFormService } from './services/shop-form.service';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import {OKTA_CONFIG,OktaAuthModule, OktaCallbackComponent, OktaAuthGuard} from '@okta/okta-angular';
import appConfig from './config/app-config';
import { OrderHistoryService } from './services/order-history.service';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MapsComponent } from './components/maps/maps.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HawkerListService } from './services/hawker-list.service';
import { HawkerListComponent } from './components/hawker-list/hawker-list.component';




const oktaConfig = Object.assign({
    onAuthRequired: (injector) => {
      const router = injector.get(Router);
      router.navigate(['/login']);
    }
}, appConfig.oidc);

const appRoutes: Routes = [
      {path: 'hawkers', component: HawkerListComponent},
      {path: 'location', component: MapsComponent},
      {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard]},
      {path: 'login/callback', component: OktaCallbackComponent},
      {path: 'login', component: LoginComponent},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'cart-details', component:CartDetailsComponent},
      {path: 'products/:id', component: ProductDetailsComponent},
      {path: 'search/:keyword', component: ProductListComponent},
      {path: 'category/:id', component: ProductListComponent},
      {path: 'category', component: ProductListComponent},
      {path: 'products', component: ProductListComponent},
      {path: '', redirectTo:'/products', pathMatch:'full'},
      {path:'**', redirectTo:'/products', pathMatch:'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,

    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    OrderHistoryComponent,
    MapsComponent,
    HawkerListComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule, ReactiveFormsModule,
    OktaAuthModule, GoogleMapsModule, ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the app is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [ProductService,CartService,CheckoutService,
              ShopFormService,{provide: OKTA_CONFIG, useValue: oktaConfig},
              {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi: true },
              OrderHistoryService, HawkerListService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
