import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NFC } from '@ionic-native/nfc/ngx';
import { HttpService } from '../../../../../common/service/http-config.service';
import { ToastService } from 'ng-zorro-antd-mobile';
import { Storage } from '@ionic/storage';
import { NfcService } from '../../../../../common/service/nfc.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.page.html',
  styleUrls: ['./project-detail.page.scss'],
})
export class ProjectDetailPage implements OnInit {
  public project: any;
  public userId;
  public olderId;
  // 登记diy选项
  diy = [];
  goods = false; // 是否使用物品
  num = 0; // 使用多少件
  constructor(
    public route: ActivatedRoute,
    private toast: ToastService,
    public http: HttpService,
    private cfn: NfcService,
    private nfc: NFC,
    private storage: Storage
  ) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    console.error(queryParams);
    this.project = queryParams.info;
    this.olderId = queryParams.olderId;
    // 物品件数
    if(this.project.pieces) this.num = this.project.pieces;
    // diy选项
    if(this.project.diy) {
      this.diy = JSON.parse(this.project.diy);
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
          // {\"oldmanName\":\"靳锡龙\",\"bedId\":\"4028810a6afdc1a0016b028b19760002\",\"oldmanId\":\"4028810a6b3f1a7c016b3f732ad4001a\",\"tag\":\"oldman\",\"bedName\":\"208-5\"}
          // {"oldId":"老人id","eId":"员工id","itemId":"服务项目id","serviceId":"服务id","type":"服务类型","registContent":"登记内容"}
          let info = JSON.parse(data.data);
          // 判断扫码跟当前是否同一老人
          if(this.olderId !== info.oldmanId){
            ToastService.fail("当前扫描卡牌与所选老人信息不匹配");
            return;
          }
          let scanData = {
            oldId: info.oldmanId,
            eId: this.userId,
            itemId: this.project.id,
            serviceId: this.project.serviceId,
            type: this.project.type,
            registContent: {
              diy: this.diy,
              goods: this.goods,
              num: this.num
            }
          };
          ToastService.loading('登记信息中...', 0);
          this.http.post('care/saveCare', scanData).then(data => {
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

  ionViewWillLeave(){
    this.cfn.nnffcc.subscribe(()=>{});
  }

}
