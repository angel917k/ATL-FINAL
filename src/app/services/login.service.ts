// This is the login service. Any component that needs the user's login information will need to import this and
// inject it in that components constructor
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class LoginService {

    // declare logged in user as observable
    private _loggedInUser: Observable<firebase.User>;


    // grab the logged in user as an observable from the fire auth service
    // Note that the way an instance of angularfireauth is declared in the constructor. if you want to inject
    // a service this is how you would do it
    constructor( private _authService: AngularFireAuth ) {
        this._loggedInUser = _authService.authState;

    }

    // this is the method for logging in. it returns a promise and uses the angularfire signinwithpopup
    public login(): Promise<any> {
        console.log('Logging in via google popup...');
        return this._authService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
    }

    // this is the method for logging out.
    public logout(): Promise<any> {
        return this._authService.auth.signOut();
    }

    // this is the method for getting the current logged in user. note that this returns a rather large observable object, so any time you
    // want to grab it, you may want to .map the results into a more manageable object
    public getLoggedInUser(): Observable<firebase.User> {
        return this._loggedInUser;
    }
}
