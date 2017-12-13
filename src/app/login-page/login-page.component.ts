import { Component, OnInit } from '@angular/core';

import { LoginService } from './../services/login.service';
import { TipService } from './../services/tip.service';

import IUser from './../interfaces/user.interface';

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

    // ngModels for password entry
    public pass1: string;
    public pass2: string;
    private _passwordError = false;

    public canViewTips = false; // flag to make sure user can view tips. is ALWAYS false on reload
    public userTips = []; // will contain user's stored tips from DB once verified

    constructor(private _loginService: LoginService, private _tipService: TipService) { }

    ngOnInit() {

        // Get the logged in user from the service on page init
        this._loginService.getLoggedInUser()
        .subscribe( user => {
            this.loggedInUser = user;
            // console.log(this.loggedInUser);
            if (this.loggedInUser) {
                this.dataCheck(this.loggedInUser.uid);
                console.log('running initial check...');
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

    // method to add a new user to the database
    public submitNewUser() {

        // make sure the password is both not blank and matches
        if (this.pass1 === '' || (!this.pass1)) {
            this._passwordError = true;
            return;
        }

        // create the new IUser that will be posted on the DB
        const newUser: IUser = {
            name: this.loggedInUser.displayName,
            uid: this.loggedInUser.uid,
            viewpass: this.pass1,
            tips: []
        };

        // call the tip service to add the user
        this._tipService.addUser(newUser)
        .subscribe(data => {
            this.pass1 = '';
            this.pass2 = '';
            this.dataCheck(this.loggedInUser.uid);
        });
    } // end submitnewuser

        // this is the function of the button that only appears once its been verified that the logged in user is in
    // the database and has a password. it asks for the viewing password in an prompt and then checks the database to make sure they match
    // if it does, it instantiates the array of tips with all tips that are inside that document
    public viewTips() {
        const password = prompt('Input your viewing password');
        this._tipService.verifyViewPass(this.loggedInUser.uid, password)
        .subscribe(res => {
            if (res === false) {
                alert('Incorrect Password');
            }
            this._getTipsByUid();
            this.canViewTips = res;

        });
    }

    // method to pull all tips associates with a user id.
    // THIS SHOULD ONLY BE CALLED WHEN PASSWORD HAS BEEN VERIFIED
    private _getTipsByUid() {
        this._tipService.getTipsByUid(this.loggedInUser.uid)
        .subscribe( res => {
            this.userTips = res.tips;
            // console.log(this.userTips);
        });
    }

    public deleteMyTips() {
        if (confirm('This will delete all the tips associate with your account! Are you sure?')) {
            this._tipService.deleteAllTips(this.loggedInUser.uid);
        }
    }
}
