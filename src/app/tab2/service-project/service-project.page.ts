import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFC } from '@ionic-native/nfc/ngx';
import { HttpService } from '../../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Storage } from '@ionic/storage';
import { NfcService } from '../../../common/service/nfc.service';

@Component({
  selector: 'app-service-project',
  templateUrl: './service-project.page.html',
  styleUrls: ['./service-project.page.scss'],
})
export class ServiceProjectPage implements OnInit {
  public data: any;
  public userId;
  // slide 选项
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  // 登记diy选项
  diy = [];
  goods = false; // 是否使用物品
  num = 0; // 使用多少件
  
  constructor(
    private toast: ToastService,
    public route: ActivatedRoute,
    public http: HttpService,
    private cfn: NfcService,
    private nfc: NFC,
    private storage: Storage
  ) { }

  ngOnInit() {
    // 获取路由参数
    const queryParams = this.route.snapshot.queryParams;
    console.error(queryParams);
    this.data = queryParams.info;
    // 物品件数
    if(this.data.item.pieces) this.num = this.data.item.pieces;
    if(!(this.data.x instanceof Array)){this.data.x = []};
    // diy选项
    if(this.data.item.diy) {
      this.diy = JSON.parse(this.data.item.diy);
      this.diy.forEach(item=>{
        if(item.classify == '多选'){
          item.value.forEach(x=>{
            x['ischecked'] = x['ischecked']?x['ischecked']:false;
          })
        }
        if(item.classify == '单选'){
          item.value['checkValue'] = item.value['checkValue']?item.value['checkValue']:undefined;
        }
      })
    };
    // get User Id
    this.storage.get('userINFO').then(data => {
      this.userId = data.id;
      // nfc监听
      this.scanNFC();
    });
  }

  // slide change callback
  segmentChanged(segment,slider){
    console.log(segment.value)
    slider.slideTo(Number(segment.value));
  }
  slideChange(slider,segment){
    setTimeout(() => {
      slider.getActiveIndex().then(index=>{
        segment.value = `${index}`;
      });
    }, 200);
  }
  // 是否使用物品
  useGood(value){
    this.goods = value;
  }
  // checkbox callback
  radioChange(value,index){
    this.diy[index].value.checkValue = value;
  }

  // receive the NFC message then submit the register info
  scanNFC(){
    this.cfn.nnffcc.subscribe(data => {
      let rfid = this.nfc.bytesToHexString(data.tag.id).split(':').join('');
      ToastService.loading('获取扫描信息...', 0);
      // 获取nfc所绑定信息
      this.http.post('appLogin/scan',{search: rfid}).then(data=>{
        ToastService.hide();
        if(data.code === 0){
          // {"oldId":"老人id","area":"区域名称","eId":"员工id","itemId":"服务项目id","type":"服务类型","time":"时间条件","registContent":"登记内容"}
          // {"oldId":"老人id","area":"区域名称","eId":"员工id","itemId":"服务项目id","type":"服务类型","time":"时间条件","registContent":"登记内容","isNow":"是否当前时间内完成","oldIds":"服务老人ids"}
          // {\"oldmanName\":\"靳锡龙\",\"bedId\":\"4028810a6afdc1a0016b028b19760002\",\"oldmanId\":\"4028810a6b3f1a7c016b3f732ad4001a\",\"tag\":\"oldman\",\"bedName\":\"208-5\"}
          let info = JSON.parse(data.data);
          let scanData = {
            isNow: this.data.isNow,
            oldIds: this.data.oldIds,
            oldId: info.oldmanId ? info.oldmanId : '',
            area: info.area ? info.area : '',
            eId: this.userId,
            itemId: this.data.item.id,
            type: this.data.type ? this.data.type : '',
            time: this.data.time ? this.data.time : '',
            registContent: {
              diy: this.diy,
              goods: this.goods,
              num: this.num
            }
          };
          ToastService.loading('登记信息中...', 0);
          this.http.post('care/save', scanData).then(data => {
            ToastService.hide();
            if(data.code === 0){
              ToastService.success('登记成功！')
            }else{
              ToastService.fail(data.message ? data.message : "登记信息失败，请联系管理员！");
            }
          })
        }else{
          ToastService.fail(data.message ? data.message : "扫描信息失败，请联系管理员！");
        }
      });
    });

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  ionViewWillLeave(){
    this.cfn.nnffcc.subscribe(()=>{});
  }

}
