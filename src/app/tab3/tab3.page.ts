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
    console.error(el);
    const color = el['style'].getPropertyValue('--ion-background-color');
    console.error(color);
    el['style'].setProperty('--ion-background-color', '#006600');

  }
}
