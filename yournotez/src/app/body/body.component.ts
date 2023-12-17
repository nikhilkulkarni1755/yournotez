import { Component } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent {

  numNotes:number = 0
  notes:any

  ngOnChanges() {
    this.getNotes()
  }
  
  constructor(private ls: LocalStorageService) {
    console.log('number of notes: ' + ls.getNumberOfNotes())
    this.ls.currentNotes.subscribe(numberOfNotes => this.numNotes = numberOfNotes)
    // this.numNotes = ls.getNumberOfNotes()
    this.getNotes()
  }

  getNotes() {
    this.notes = this.ls.getData()
    // console.log(this.notes)
  }

  // this.ls.
}
