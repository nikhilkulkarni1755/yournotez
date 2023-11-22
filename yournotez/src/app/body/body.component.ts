import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  note:string = ''

  constructor(private ls: LocalStorageService) {
    console.log('number of notes: ' + ls.getNumberOfNotes())
  }


}
