import { Component, OnInit } from '@angular/core';

import { LoginService } from './../services/login.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public loggedInUser;

  constructor(private _loginService: LoginService) { }

  ngOnInit() {

    // Get the logged in user from the service on page init
    this._loginService.getLoggedInUser()
    .subscribe( user => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
        if (this.loggedInUser) {
            // this.dataCheck(this.loggedInUser.uid);
            // console.log('running initial check...');
        }
    });

  } // end oninit

  // login through the login service
  public login() {
    this._loginService.login();
}

// logout with a confirm to verify
public logout() {
    if (confirm('Do you really wanna leave?')) {
        this._loginService.logout();
    }

}

}
