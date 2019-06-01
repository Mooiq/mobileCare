/************************************
 *       android物理返回按钮         * 
 ************************************/
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackButtonService {

  constructor() { }

  backbutton(){
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown(e) {
      e.preventDefault();
      navigator.vibrate(500);
      window.history.back();
    }
  }

}
