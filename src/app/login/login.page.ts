import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ToastService } from 'ng-zorro-antd-mobile';
import { NavController } from '@ionic/angular';
import { HttpService } from '../../common/service/http-config.service';
import { NfcService } from '../../common/service/nfc.service';
import { NFC } from '@ionic-native/nfc/ngx';
import { ThemeChangeService } from '../../common/service/theme-change.service';
import { SpeakService } from '../../common/service/speak.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loading = false;
  user = {
    Enum: '18352526977',
    password: '123456',
    RFID: ''
  };
  constructor(
    private toast: ToastService,
    public nav: NavController,
    public http: HttpService,
    private storage: Storage,
    private cfn: NfcService,
    private Theme: ThemeChangeService,
    private Speak: SpeakService,
    private nfc: NFC
  ) { }

  ngOnInit() {
    this.cfn.nnffcc.subscribe(data => {
      let rfid = this.nfc.bytesToHexString(data.tag.id).split(':').join('');
      this.user.RFID = rfid;
      this.formSubmit();
    });
  }

  ionViewWillLeave(){
    this.cfn.nnffcc.subscribe(()=>{});
  }

  formSubmit() {
    // this.nav.navigateRoot('/tabs/tab2');
    this.loading = true;
    ToastService.loading('登陆中...', 0);
    this.loading = false;
    this.http.post('employees/login', this.user).then(data => {
      ToastService.hide();
      if ( data.code === 0 ) {
        this.storage.set('userINFO', JSON.parse(data.data));
        this.storage.set('loginStatus', true);
        this.storage.set('darkTheme', false).then((res)=>{
          this.Theme.ThemeChange('dark');
        });
        this.storage.set('ttsSpeak', false).then(()=>{
          this.Speak.onOff = false;
        });;
        this.nav.navigateRoot('/tabs/tab2');
      } else {
        ToastService.fail(data.message ? data.message : "服务器连接异常，请联系管理员！");
      }
    });
  }

}
