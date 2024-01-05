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
  colors = ['#90EE90', '#94B3EC', '#FFA500', '#F98181', '#FFC0CB']
  

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

  getData() {
    if(localStorage.getItem('0') === null) {
      localStorage.setItem('0', '0')
      this.numberOfNotes = 0
    }
    else {
      this.numberOfNotes = Number(localStorage.getItem('0'))
      console.log('Found ' + this.numberOfNotes + " number of notes")
      for(let i = 1; i < this.numberOfNotes; i++) {
        let info = localStorage.getItem(i+'')
        let color = info?.slice(-7)
        let note = info?.substring(0, info.length-9)


        console.log(info + " is all the info")
        console.log(color + " is the color")
        console.log(note + " is the note")
      }
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
    this.saveData(data, this.colors[this.getRandomColor()])

    // this.myInputField.nativeElement.value = ''
    // this.myInputField.nativeElement.focus()
    // localStorage.setItem(Number(this.numberOfNotes)+1 + '', JSON.stringify({note:data, color:this.colors[this.getRandomColor()]}))
    // this.allnotes.unshift({note:data, color:this.colors[this.getRandomColor()]})
  }

  saveData(input:string, color:string) {
    console.log('this is the input:' + input)
    this.numberOfNotes += 1
    this.updateNumberOfNotes(Number(this.numberOfNotes) + 1)
    localStorage.setItem(this.numberOfNotes + '', input + '||' + color)
    console.log(localStorage.getItem(this.numberOfNotes+''))
  }
}
