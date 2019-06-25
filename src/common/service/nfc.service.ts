/**
 * Created by Mooqi on 19-6-18.
 * 写这么服务主要是因为nfc插件每次监听就会再次启动一个nfc的监听对象，造成多个订阅事件累加
 * 现只启动一个nfc可订阅对象 nnffcc ，用到页面直接订阅即可
 */
import { Injectable } from '@angular/core';
import { NFC } from '@ionic-native/nfc/ngx';
@Injectable({
  providedIn: 'root'
})
export class NfcService {
  public nnffcc: any;
  constructor(private nfc: NFC) {
    this.nnffcc = nfc.addNdefFormatableListener();
   }
}
