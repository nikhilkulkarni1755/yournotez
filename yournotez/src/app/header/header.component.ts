import { Component, Renderer2, RendererFactory2 } from '@angular/core';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  data:string = ''
  
  constructor(private ls:LocalStorageService) {
    
  }
  onSubmit(inputdata:string) {
    console.log('clicked here!')
    console.log(inputdata)
    this.ls.saveData(inputdata)
    // this.ls.getData()
  }

  clearAll() {
    // add a confirm feature later

    // if(confirm('Clear all your Notes?')) {
    //   this.ls.clearAll()
    //   console.log('Clearing all!')
    // }
    // else {
    //   console.log('Not clearing all!')
    // }

    this.ls.clearAll()

  }
    
    
  
}
