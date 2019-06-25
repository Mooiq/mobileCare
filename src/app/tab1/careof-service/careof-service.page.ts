import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Storage } from '@ionic/storage';
import {toggle, expand, collapse} from 'transition-height';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-careof-service',
  templateUrl: './careof-service.page.html',
  styleUrls: ['./careof-service.page.scss'],
})
export class CareofServicePage implements OnInit {
  public userId;
  olderInfo = []; // 获取所在班组房间床位
  constructor(
    private toast: ToastService,
    public http: HttpService,
    public nav: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
    // get User Id
    this.storage.get('userINFO').then(data => {
      this.userId = data.id;
      this.getOlderInfo(this.userId);
    });
  }

  // 获取所在区域床位（老人）信息
  getOlderInfo(id, e?: any){
    ToastService.loading('获取相关信息...', 0);
    this.http.get('attention/listRoomInfo',{id:id}).then(data=>{
      ToastService.hide();
      if(e) e.target.complete();
      if(data.code === 0){
        if(data.data instanceof Array) data.data.forEach((item)=>{item['isExpand'] = true;});
        this.olderInfo = data.data;
        console.log(this.olderInfo);
      }
    });
  }

  // 是否展开对应房间
  flexible(id,index){
    let element = document.getElementById(id);
    const isExpanding = toggle(element, 60);
    this.olderInfo[index]['isExpand'] = isExpanding;
  }

  // 下拉刷新
  doRefresh(event) {
    this.getOlderInfo(this.userId,event);
  }

  // 详情页
  goDetail(data) {
    if (data.oldman) {
      this.nav.navigateForward('/careof-service/careof-service-detail', {
        queryParams: { info: data.oldman }
      });
    }
  }
}
