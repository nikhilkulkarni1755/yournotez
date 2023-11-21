import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  numberOfNotes:any = 0

  constructor() {
    this.getData()
  }

  public getNumberOfNotes() {
    if(localStorage.getItem('0') === null) {
      localStorage.setItem('0', '0')
    }
    return localStorage.getItem('0')
  }

  public getData() {
    this.numberOfNotes = localStorage.getItem('0')
  }

  public saveData() {

  }
}
