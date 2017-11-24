import { Component, OnInit } from '@angular/core';

import { LoginService } from './../services/login.service';
import { TipService } from './../services/tip.service';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public loggedInUser; // will contain users login info
  public userIdResult; // flag to denote if the user is in the database
  public viewPassResult; // flag to denote if the user has a viewing password.

  constructor(private _loginService: LoginService, private _tipService: TipService) { }

  ngOnInit() {

    // Get the logged in user from the service on page init
    this._loginService.getLoggedInUser()
    .subscribe( user => {
        this.loggedInUser = user;
        // console.log(this.loggedInUser);
        if (this.loggedInUser) {
            // this.dataCheck(this.loggedInUser.uid);
            // console.log('running initial check...');
        }
    });

  } // end oninit

    // login through the login service
    public login() {
        this._loginService.login();
    }  // end login

    // logout with a confirm to verify
    public logout() {
        if (confirm('Do you really wanna leave?')) {
        this._loginService.logout();
        }
    } // end logout()

    // method to call the tipservce and make sure that the logged in user has a document in the database with their userid
    public userIdCheck(id) {
        this._tipService.checkUser(id)
        .subscribe(result => {
            console.log('result', result);
            this.userIdResult = result;
        });
    } // end userIdCheck()

    // calls the tip service to make sure the document associated with the users id also has a viewpass
    public viewPassCheck(id) {
        this._tipService.checkViewPass(id)
        .subscribe(result => {
            this.viewPassResult = result;
        });
    } // end viewPassCheck()

    // method to make sure that the logged in user has both an id, and a viewpass associated with that id
    // returning false on any of the two nested methods will not allow the user to view their tips
    public dataCheck(uid) {

        if (!uid) {
            console.log('No userID passed to datachecker, aborting.');
            return;
        }
        this.userIdCheck(uid);
        this.viewPassCheck(uid);

    } // end datacheck()

}
