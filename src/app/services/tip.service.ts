import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import ITip from './../interfaces/tip.interface';
import IUser from './../interfaces/user.interface';

import 'rxjs/add/operator/map';


@Injectable()

export class TipService {

    // initialize http module in constructor and let user know in console that its up and running
    constructor( private http: Http ) {
        console.log('Tip service initialized...');
    }

    // this method brings back the entire document from the database thaqt contains the user id from google.
    // NOTE: in the future, try to .map the result so it only sends the tip array as opposed to the whole document
    // for security reasons
    public getTipsByUid(id) {
        return this.http.get('http://localhost:3000/api/tip-uid/' + id)
            .map(res => res.json());
    }

    // Checks the database to see if there is a document in the database tht container the logged in users id.
    // returns either true/false
    // essentially, this is used to check and see if the user needs to have a tip array initialized
    public checkUser(id) {
        return this.http.get('http://localhost:3000/api/contain/' + id)
            .map(response => {
                return response.json();
            });
    }

    // Check the database to see if that there is a viewing password associated with the document that conatins passed id
    // In theory this should always return true if there is a user because creation of the document requires a viewpass
    public checkViewPass(id) {
        return this.http.get('http://localhost:3000/api/viewpasscheck/' + id)
        .map(res => res.json());
    }

    // verifies that the password inputted matches the view password in the database. the correct password is only kept on the
    // backend for security purposes
    public verifyViewPass(id, pass) {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const req = {
            viewpass: pass,
            uid: id
        };

        return this.http.post('http://localhost:3000/api/viewpassverify/' + id, JSON.stringify(req), {headers: headers})
        .map(res => res.json());
    }

    // this calls the api to add a new tip to the database that is sent in
    public addTip(newTip: ITip) {
        // create a new set of headers and add the content type
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        // return the post request mapped to a json
        return this.http.post('http://localhost:3000/api/tip', JSON.stringify(newTip), {headers: headers})
            .map(res => res.json);
    }

       // this will add a user into the database, giving them a document with an empty tip array
    public addUser(newUser) {
        // create a new set of headers and add the content type
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log('Sending the following user to database:', newUser);

        // return the post request mapped to a json
        return this.http.post('http://localhost:3000/api/add-user', JSON.stringify(newUser), {headers: headers})
            .map(res => res.json);
    }

    public pushTip(newTip, id) {
        // instead of posting an entire document to the collection in the database, this pushes one object into the tip array
        // inside the document of the user who is currently logged in. at least thats what this will eventually do, lol
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post('http://localhost:3000/api/array-tip/' + id, JSON.stringify(newTip), {headers: headers} )
            .map(res => res.json);
    }

    // this method clears all the tips from a given user id
    public deleteAllTips(id) {
        console.log('deleting tips...');
        return this.http.get('http://localhost:3000/api/clear-tips/' + id)
        .map(res => res.json);
    }

    // this method deletes the tip given the correct id
    deleteTip(id) {
        return this.http.delete('http://localhost:3000/api/tip/' + id)
            .map(res => res.json());
    }

}
