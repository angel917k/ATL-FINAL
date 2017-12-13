import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.css']
})

export class HelpComponent {

  constructor(private _location: Location) { }
  backClicked() {
      this._location.back();
  } //function which returns user to previous page/component using the back button

}
