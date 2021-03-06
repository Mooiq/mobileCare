import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../../../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Storage } from '@ionic/storage';
import { NavController } from '@ionic/angular';
import {toggle, expand, collapse} from 'transition-height';
@Component({
  selector: 'app-plan-day',
  templateUrl: './plan-day.component.html',
  styleUrls: ['./plan-day.component.scss'],
})
export class PlanDayComponent implements OnInit {
  @Input() olderId;
  timeLine = [];
  constructor(
    private toast: ToastService,
    public http: HttpService,
    public nav: NavController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.getDailyInfo(this.olderId);
  }
  // ionViewWillEnter(){
  //   this.getDailyInfo(this.olderId);
  // }

  // 获取日计划信息
  getDailyInfo(id){
    this.http.post('care_service/listDayApp',{oldmanId:id}).then(data=>{
      if(data.code === 0){
        if(data.data instanceof Array){
          data.data.forEach(element => {
            element['isExpand'] = true;
            if(element['item'] instanceof Array){
              element['item'].forEach(x => {
                if(x["picEl"]){
                  x["picEl"] = JSON.parse(x["picEl"]);
                }
              });
            }
          });
        }
        this.timeLine = data.data;
        console.log(this.timeLine);
      }
    })
  }

  // 详情页
  goDetail(data) {
    this.nav.navigateForward('/careof-service/careof-service-detail/project-detail', {
      queryParams: { info: data, olderId: this.olderId }
    });
  }

  // 是否展开对应房间
  flexible(id,index){
    let element = document.getElementById(id);
    const isExpanding = toggle(element, 60);
    console.log(element);
    this.timeLine[index]['isExpand'] = isExpanding;
    console.error(this.timeLine[index]['isExpand'])
  }

}
