import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../common/service/http-config.service';
import { Storage } from '@ionic/storage';
import { ToastService } from 'ng-zorro-antd-mobile';
@Component({
  selector: 'app-careof-overview',
  templateUrl: './careof-overview.page.html',
  styleUrls: ['./careof-overview.page.scss'],
})
export class CareofOverviewPage implements OnInit {
  nowDate: any;
  selDate: any;
  spid = ''; // 班组id
  userid = ''; // 用户id
  sumy: any;
  constructor(
    private toast: ToastService,
    public http: HttpService,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.nowDate = this.date(new Date());
    this.storage.get('userINFO').then(res=>{
      this.spid = res.spid;
      this.userid = res.id;
      this.getSummary(this.nowDate);
    })
  }

  dateChange(val){
    this.selDate = new String().slice.call(val.detail.value, 0, 10);
    this.getSummary(this.selDate);
  }

  date(T: Date, split = '-') {
    const y = T.getFullYear(),
    m = T.getMonth() + 1 < 10 ? `0${T.getMonth() + 1}` : T.getMonth() + 1,
    d = T.getDate() < 10 ? `0${T.getDate()}` : T.getDate();
    return `${y + split + m + split + d}`;
  }

  getSummary(time){
    ToastService.loading('',0);
    this.http.get('appServerItem/serverPandect',{id:this.userid,spid:this.spid,time:time}).then(res=>{
      ToastService.hide();
      if(res.code === 0){
        console.log(res.data);
        this.sumy = res.data;
      }else{
        ToastService.show(res.message?res.message:'请求遇到了问题...')
      }
    })
  }

}
