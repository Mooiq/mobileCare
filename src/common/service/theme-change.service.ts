/**
 * Created by Mooqi on 6-2.
 */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class ThemeChangeService {

  constructor(
    private storage: Storage,
  ) { }

  ThemeChange(theme:string){
    const rootEl = document.querySelector(':root');
    // this.storage.get('Theme').then(theme => {
    if (theme === 'dark') {
      rootEl['style'].setProperty('--ion-background-color', 'rgb(244, 244, 244)');
      rootEl['style'].setProperty('--my-color-text', '#000000');
      // this.storage.set('Theme', 'light');
    } else {
      rootEl['style'].setProperty('--ion-background-color', 'rgb(54, 69, 79)');
      rootEl['style'].setProperty('--my-color-text', '#3880ff');
      // this.storage.set('Theme', 'dark');
    }
    // });
  }

}
