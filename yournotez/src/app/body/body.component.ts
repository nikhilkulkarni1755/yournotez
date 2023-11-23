import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  notes:any
  
  constructor(private ls: LocalStorageService) {
    console.log('number of notes: ' + ls.getNumberOfNotes())
    this.getNotes()
  }

  getIndexes() {
    
  }

  getNotes() {
    this.notes = this.ls.getData()
    console.log(this.notes)
  }
}
