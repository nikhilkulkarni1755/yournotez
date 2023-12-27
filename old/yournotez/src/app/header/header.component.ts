import { Component, ViewChild, ElementRef, OnInit, Renderer2, RendererFactory2, EventEmitter, Output } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';
// import { BodyComponent } from '../body/body.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { // implements OnInit 

  // data:string = ''

  @Output() eventName = new EventEmitter<string>()

  @ViewChild("note") myInputField: ElementRef = {} as ElementRef
  ngAfterViewInit() {
    this.myInputField.nativeElement.focus()
  }

  // ngOnInit() {
  //   this.myInputField.nativeElement.focus()
  // }
  
  constructor(private ls:LocalStorageService) {
    
  }

  onSubmit(inputdata:string) {
    console.log('clicked here!')
    console.log(inputdata)
    this.ls.saveData(inputdata)
    this.eventName.emit()

    this.myInputField.nativeElement.focus()
    this.myInputField.nativeElement.value = ''
    // this.data = ''
    // this.b.getNotes()

    // Here we need to do something so that body refreshes
  }

  clearAll() {
    this.ls.clearAll()
  }
}
