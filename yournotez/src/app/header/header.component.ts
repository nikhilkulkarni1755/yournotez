import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild("notes") myInputField: ElementRef = {} as ElementRef
  numberOfNotes:number = 0
  counter: number = 1
  colors = ['lightgreen', 'rgb(148, 179, 236)', 'orange', 'rgb(249, 249, 129)', 'pink']
  

  // localStorage.setItem('0', newNumber + '')
  allnotes:any[] = []
  constructor() {
    this.getData()
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

  private updateNumberOfNotes(newNumber:number) {
    localStorage.setItem('0', newNumber + '')
  }

  saveData(input:string) {
    console.log('this is the input:' + input)
    this.numberOfNotes += 1
    this.updateNumberOfNotes(Number(this.numberOfNotes) + 1)
    localStorage.setItem(this.numberOfNotes + '', input)
    
  }

  getData() {
    if(localStorage.getItem('0') === null) {
      localStorage.setItem('0', '0')
      this.numberOfNotes = 0
    }
    else {
      this.numberOfNotes = Number(localStorage.getItem('0'))
      
    }
  }

  clearAll() {
    localStorage.clear()
    this.allnotes = []
  }

  private getRandomColor() {
    return Math.floor(Math.random() * this.colors.length);
  }
  
  onSubmit(data:string) {
    console.log(data)
    this.saveData(data)

    this.myInputField.nativeElement.value = ''
    this.myInputField.nativeElement.focus()
    localStorage.setItem(Number(this.numberOfNotes)+1 + '', JSON.stringify({note:data, color:this.colors[this.getRandomColor()]}))
    this.allnotes.unshift({note:data, color:this.colors[this.getRandomColor()]})
  }
}
