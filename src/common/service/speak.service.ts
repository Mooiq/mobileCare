/**
 * Created by Mooqi on 6-2.
 */
import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class SpeakService {
  public onOff: boolean = false;
  constructor(
    private storage: Storage,
    private tts: TextToSpeech
  ) { }

  speak(text:string){
    if(this.onOff){
      this.tts.speak({text: text,locale: 'zh-CN'});
    }
  }
  stop(){
    this.tts.speak({text: '',locale: 'zh-CN'});
  }
}
