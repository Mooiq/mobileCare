import { Component } from '@angular/core';
import { HttpService } from '../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  show = true;
  constructor(
    public http: HttpService,
    private _toast: ToastService
  ) {}

  ionViewDidEnter(){

    // http请求测试
    // this.http.get('building/list').then(data=>{
    //   console.log(data);
    // });

    // this.http.post('floor/list',{buildingId:"4028815e6b01e97f016b02261ab101ed"}).then(data=>{
    //   console.error(data);
    // })

  }

}
