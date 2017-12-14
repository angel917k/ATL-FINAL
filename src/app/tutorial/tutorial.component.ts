import { Component } from '@angular/core';
import {Location} from '@angular/common';

@Component({
    selector: 'app-tutorial',
    templateUrl: './tutorial.component.html',
    styleUrls: ['./tutorial.component.css']
})

export class TutorialComponent {

  constructor(private _location: Location) { }

  backClicked() {
      this._location.back();
  } //function which returns user to previous page/component using the back button

}
