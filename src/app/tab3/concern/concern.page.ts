import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Storage } from '@ionic/storage';
import {toggle, expand, collapse} from 'transition-height';
import { SpeakService } from '../../../common/service/speak.service';

@Component({
  selector: 'app-concern',
  templateUrl: './concern.page.html',
  styleUrls: ['./concern.page.scss'],
})
export class ConcernPage implements OnInit {
  public userId;
  olderInfo = []; // 获取所在班组房间床位
  constructor(
    private toast: ToastService,
    public http: HttpService,
    private Speak: SpeakService,
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

  // 关注、取消关注
  concerSb(bed){
    ToastService.loading('', 0);
    let sendData = {
      // {nurseId:护工id,oldmanId:老人id,bedId:床位id}
      nurseId: this.userId,
      bedId: bed.id,
      oldmanId: ''
    };
    if(bed.oldman) sendData.oldmanId = bed.oldman.id;
    this.http.post('attention/attentionOrCancel', sendData).then(data=>{
      ToastService.hide();
      if(data.code === 0){
        ToastService.success('操作成功！', 500,()=>{
          this.Speak.speak(data.message);
          this.getOlderInfo(this.userId);
        });
      }else{
        ToastService.fail(data.message?data.message:'操作失败！');
        this.Speak.speak(data.message);
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

  //
  speak(data): void{
    if(data[0]){
      data[0] = data[0].split('').concat(['床']).join().replace('-', '房间');
    }
    let some = data.join(',');
    this.Speak.speak(some);
  }

}
