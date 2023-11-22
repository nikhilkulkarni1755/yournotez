import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  data:string = ''
  onSubmit(inputdata:string) {
    console.log('clicked here!')
    console.log(inputdata)
  }
}
