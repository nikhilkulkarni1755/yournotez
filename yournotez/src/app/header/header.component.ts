import { Component, ViewChild, ElementRef, OnInit, Renderer2, RendererFactory2 } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { // implements OnInit 

  // data:string = ''

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

    // this.myInputField.nativeElement.clearAll()
    this.myInputField.nativeElement.focus()
    this.myInputField.nativeElement.value = ''
    // this.data = ''
  }

  clearAll() {
    this.ls.clearAll()
  }
}
