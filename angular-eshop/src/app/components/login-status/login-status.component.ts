import { Component, OnInit } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean = false;
  userFullName: string;

  storage: Storage = sessionStorage;

  constructor(private oktaAuthSvc: OktaAuthService) { }

  ngOnInit(): void {
      //subcribe to authentication state
      this.oktaAuthSvc.$authenticationState.subscribe(
        (result) => {
          this.isAuthenticated = result;
          this.getUserDetails();
        }
      )
  }
  getUserDetails() {
      if(this.isAuthenticated){
        //get user log in details from session storage

        //full name is exposed
        this.oktaAuthSvc.getUser().then(
          (result) => {
            this.userFullName = result.name;

            const userEmail = result.email;

            this.storage.setItem('userEmail', JSON.stringify(userEmail))
          });
      }
  }
  logout(){
    this.oktaAuthSvc.signOut();
  }

}
