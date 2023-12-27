import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild("notes") myInputField: ElementRef = {} as ElementRef

  // localStorage.setItem('0', newNumber + '')
  allnotes:string[] = []
  constructor() {

  }

  // localStorage.setItem(this.getNumberOfNotes() + '', input)

  /* 
  if(localStorage.getItem('0') === null) {
      localStorage.setItem('0', '0')
    }
    this.numberOfNotes = Number(localStorage.getItem('0'))
    this.counter = this.numberOfNotes
    // console.log('inside getnumberofnotes() line 25:' + this.numberOfNotes)
    return this.numberOfNotes
  */

  clearAll() {
    localStorage.clear()
  }

  getData() {
    // get data from localStorage here

    // add to this.allnotes
  }
  
  onSubmit(data:string) {
    console.log(data)

    this.myInputField.nativeElement.value = ''
    this.myInputField.nativeElement.focus()
    this.allnotes.unshift(data)
  }
}
