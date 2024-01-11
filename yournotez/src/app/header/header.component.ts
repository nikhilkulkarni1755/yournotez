import { ChangeDetectorRef, Component, ElementRef, OnChanges, ViewChild, signal } from '@angular/core';
import { jsPDF } from 'jspdf' 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// export class HeaderComponent implements OnChanges{
export class HeaderComponent {

  @ViewChild("notes") myInputField: ElementRef = {} as ElementRef
  numberOfNotes:number = 0
  pdf:any
  notestring:string[] = []
  counter: number = 1
  colors = ['#90EE90', '#94B3EC', '#FFA500', '#F98181', '#FFC0CB']
  
  allnotes : any[] = []
  changedNotes = signal<any[]>([])
  // changedNotes = signal(this.allnotes)

  // ngOnChanges() {
    
  // }

  /* 
  TODO: explore if we need to focus when loading into the app 
  or just let users click as needed
  */
  constructor() {
    // this.myInputField.nativeElement.focus()
    this.getData()
  }

  getNotes() {
    this.notestring = []

    // let tempnotes = []
    for(let i = 0; i < this.allnotes.length; i++) {
      this.notestring.push(this.allnotes[i].note)
    }
    // console.log(tempnotes)
    // return tempnotes
    // console.log(this.notestring)
  }

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
      for(let i = 1; i <= this.numberOfNotes; i++) {
        let info = localStorage.getItem(i+'')
        let color = info?.slice(-7)
        let note = info?.substring(0, info.length-9)
        
        // this.changedNotes.set(this.allnotes)
        const item = {note:note, color:color}
        this.allnotes.unshift(item)
        this.changedNotes.update((allnotes) => [item, ...allnotes])
        // this.changedNotes.update((prevNotes:any[]) => [{note:note, color:color}, ...prevNotes])
      }
    }
  }

  clearAll() {
    localStorage.clear()
    this.allnotes = []
    this.changedNotes.update((allnotes) => [])

  }

  private getRandomColor() {
    return Math.floor(Math.random() * this.colors.length)
  }
  
  onSubmit(data:string) {
    console.log(data)
    this.saveData(data, this.colors[this.getRandomColor()])
    this.getData()

    // annoying solution
    location.reload()

    this.myInputField.nativeElement.value = ''
    this.myInputField.nativeElement.focus()
    
  }

  saveData(input:string, color:string) {
    this.numberOfNotes += 1
    /* TODO: visual difference by having null in the middle */
    // this.updateNumberOfNotes(Number(this.numberOfNotes) + 1)
    this.updateNumberOfNotes(Number(this.numberOfNotes))
    localStorage.setItem(this.numberOfNotes + '', input + '||' + color)
    // this.cd.detectChanges()
  }

  // export as PDF
  export() {
    if(confirm('Download your cuurent notes?')) {
      this.pdf = new jsPDF({
        orientation:'p',
        unit: 'mm',
        format: 'a4',
        putOnlyUsedFonts:true
      })
      console.log('1')
      let counter = 20
      // console.log(this.allnotes)
      // all notes is not just text, object with 2 fields
      let tempnotes = []
      for(let i = 0; i < this.allnotes.length; i++) {
        // tempnotes.push(this.allnotes.note)
      }
      // var splitNote = this.pdf.splitTextToSize(this.allnotes, 180)
      this.getNotes()
      console.log(this.notestring)
      var splitNote = this.pdf.splitTextToSize(this.notestring, 180)
      
      console.log('2')
      console.log(splitNote)
      for(let i = 0; i < splitNote.length; i++) {
          this.pdf.text((splitNote[i]), 20, counter)
          counter+=10
      }
  
      this.pdf.save('yournotez.pdf')
    }
    
  }
}
