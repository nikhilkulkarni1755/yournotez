import { ChangeDetectorRef, Component, ElementRef, OnChanges, ViewChild, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
// export class HeaderComponent implements OnChanges{
export class HeaderComponent {

  @ViewChild("notes") myInputField: ElementRef = {} as ElementRef
  numberOfNotes:number = 0
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

  }
}
