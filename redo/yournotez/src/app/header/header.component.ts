import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild("notes") myInputField: ElementRef = {} as ElementRef

  colors = ['lightgreen', 'rgb(148, 179, 236)', 'orange', 'rgb(249, 249, 129)', 'pink']
  

  // localStorage.setItem('0', newNumber + '')
  allnotes:any[] = []
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
    this.allnotes = []
  }

  getData() {
    // get data from localStorage here

    // add to this.allnotes
  }

  private getRandomColor() {
    return Math.floor(Math.random() * this.colors.length);
  }
  
  onSubmit(data:string) {
    console.log(data)

    this.myInputField.nativeElement.value = ''
    this.myInputField.nativeElement.focus()
    this.allnotes.unshift({note:data, color:this.colors[this.getRandomColor()]})
  }
}
