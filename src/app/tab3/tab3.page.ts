import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}
  change(){
    const el = document.querySelector(':root');
    el['style'].setProperty('--ion-background-color', '#383a3e');
  }
}
