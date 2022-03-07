import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
import { from, lastValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private oktaAuth: OktaAuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {

    //access tokens for secured endpoint
    //const securedEndPoints = ['http://localhost:8080/api/orders'];
    //const securedEndPoints = ['/api/orders'];
    const securedEndPoints = ['/api/orders'];

    //if endpoints meet then get the tokens
    if(securedEndPoints.some(url => request.urlWithParams.includes(url))) {

      //retrieve access tokens
      //wait for async call to finish before proceeding
      const accessToken = await this.oktaAuth.getAccessToken();

      //clone request and add header with access token
      //need to clone due immutable request
      //bearer must have space if not app cannot run
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken

        }
      })
      //console.info('>>> access token', accessToken)
    }
    return await lastValueFrom(next.handle(request));
  }
}
